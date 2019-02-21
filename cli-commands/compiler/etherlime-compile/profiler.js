var path = require("path");
var async = require("async");
var fs = require("fs");
var Graph = require("graphlib").Graph;
var Parser = require("./parser");
var expect = require("./../etherlime-expect");
var find_contracts = require("./../etherlime-contract-sources");

var CompilerSupplier = require("./compilerSupplier");

let updated = async (options) => {
  expect.options(options, [
    "resolver"
  ]);

  let contracts_directory = options.contracts_directory;
  let build_directory = options.contracts_build_directory;

  let getFiles = async () => {
    if (options.files) {
      return (options.files);
    } else {
      let files = await find_contracts(contracts_directory);
      return files;
    }
  }

  let sourceFilesArtifacts = {};
  let sourceFilesArtifactsUpdatedTimes = {};

  let updatedFiles = [];

  // TODO rewrite with await

  let prepareFiles = async () => {
    try {
      let files = await getFiles();
      files.forEach(function (sourceFile) {
        sourceFilesArtifacts[sourceFile] = [];
      });
    }
    catch (e) {
      return e;
    }
  }

  let readFiles = async () => {
    return new Promise(async (accept, reject) => {
      try {
        let build_files;
        try {
          build_files = fs.readdirSync(build_directory);
        } catch (error) {
          if (error) {
            if (error.message.indexOf("ENOENT: no such file or directory") >= 0) {
              build_files = [];
            } else {
              reject(error);
            }
          }
        }
        build_files = build_files.filter(function (build_file) {
          return path.extname(build_file) == ".json";
        });
        let jsonData = await prepareBuildFiles(build_files, build_directory);
        for (var i = 0; i < jsonData.length; i++) {
          var data = JSON.parse(jsonData[i]);

          if (sourceFilesArtifacts[data.sourcePath] == null) {
            sourceFilesArtifacts[data.sourcePath] = [];
          }

          sourceFilesArtifacts[data.sourcePath].push(data);
        }
        accept();
      }
      catch (error) {
        reject(error)
      }
    });
  }

  let prepareBuildFiles = async (build_files, build_directory) => {
    let body = [];
    build_files.forEach(buildFile => {
      try {
        body.push(fs.readFileSync(path.join(build_directory, buildFile)));
      } catch (e) {
        if (e) {
          return e
        };
      }
    });
    return body;
  }

  let prepareArtifacts = async () => {
    Object.keys(sourceFilesArtifacts).forEach(function (sourceFile) {
      var artifacts = sourceFilesArtifacts[sourceFile];

      sourceFilesArtifactsUpdatedTimes[sourceFile] = artifacts.reduce(function (minimum, current) {
        var updatedAt = new Date(current.updatedAt).getTime();

        if (updatedAt < minimum) {
          return updatedAt;
        }

        return minimum;
      }, Number.MAX_SAFE_INTEGER);

      if (sourceFilesArtifactsUpdatedTimes[sourceFile] == Number.MAX_SAFE_INTEGER) {
        sourceFilesArtifactsUpdatedTimes[sourceFile] = 0;
      }
    });
  }

  let updateFiles = async () => {
    return new Promise(async (accept, reject) => {
      var sourceFiles = Object.keys(sourceFilesArtifacts);
      let sourceFileStats = await prepareUpdateFiles(sourceFiles);

      sourceFiles.forEach(function (sourceFile, index) {
        var sourceFileStat = sourceFileStats[index];

        if (sourceFileStat == null) {
          reject();
        }

        var artifactsUpdatedTime = sourceFilesArtifactsUpdatedTimes[sourceFile] || 0;
        var sourceFileUpdatedTime = (sourceFileStat.mtime || sourceFileStat.ctime).getTime();

        if (sourceFileUpdatedTime > artifactsUpdatedTime) {
          updatedFiles.push(sourceFile);
        }
      });
      accept();
    });
  }

  let prepareUpdateFiles = async (sourceFiles) => {
    return new Promise(async (accept, reject) => {
      let stats = [];
      (sourceFiles).forEach(sourceFile => {
        try {
          let stat = fs.statSync(sourceFile);
          stats.push(stat);
        } catch (e) {
          stat = null;
        }
      });
      accept(stats);

    });
  }

  try {
    await prepareFiles();
    await readFiles();
    await prepareArtifacts();
    await updateFiles();
    return updatedFiles;
  } catch (e) {

  }
}

let required_sources = async function (options) {
  return new Promise(async (accept, reject) => {

    expect.options(options, [
      "paths",
      "base_path",
      "resolver"
    ]);

    var resolver = options.resolver;

    // Fetch the whole contract set

    let allPathsInitial = await find_contracts(options.contracts_directory);
    console.log("allPathsInital", allPathsInitial)

    options.paths.forEach(_path => {
      if (!allPathsInitial.includes(_path)) {
        allPathsInitial.push(_path)
      }
    });

    var updates = convert_to_absolute_paths(options.paths, options.base_path).sort();
    var allPaths = convert_to_absolute_paths(allPathsInitial, options.base_path).sort();

    var allSources = {};
    var compilationTargets = [];

    var supplier = new CompilerSupplier(options.compilers.solc)
    supplier.load().then(async solc => {

      // Get all the source code
      try {
        let resolved = await resolveAllSources(resolver, allPaths, solc);
        console.log("resolved", resolved)
        // Generate hash of all sources including external packages - passed to solc inputs.
        var resolvedPaths = Object.keys(resolved);
        resolvedPaths.forEach(file => allSources[file] = resolved[file].body)
        // Exit w/out minimizing if we've been asked to compile everything, or nothing.
        if (listsEqual(options.paths, allPaths)) {
          accept(allSources, {});
        } else if (!options.paths.length) {
          accept({}, {});
        }

        // Seed compilationTargets with known updates

        updates.forEach(update => compilationTargets.push(update));

        // While there are updated files in the queue, we take each one
        // and search the entire file corpus to find any sources that import it.
        // Those sources are added to list of compilation targets as well as
        // the update queue because their own ancestors need to be discovered.
        while (updates.length > 0) {
          var currentUpdate = updates.shift();
          var files = allPaths.slice();
          while (files.length > 0) {
            var currentFile = files.shift();

            // Ignore targets already selected.
            if (compilationTargets.includes(currentFile)) {
              accept();
            }
            var imports;
            try {
              imports = getImports(currentFile, resolved[currentFile], solc);
            } catch (err) {
              err.message = "Error parsing " + currentFile + ": " + err.message;
              reject(err)
            }

            // If file imports a compilation target, add it
            // to list of updates and compilation targets
            if (imports.includes(currentUpdate)) {
              updates.push(currentFile);
              compilationTargets.push(currentFile);
            }
            accept();
          }
        }

      } catch (err) {
        if (err) {
          reject(err);
        }
      }

    });
  });
}

let resolveAllSources = async function (resolver, initialPaths, solc) {
  var mapping = {};
  let resolvedResources = {};
  var allPaths = initialPaths.slice();

  async function generateMapping() {
    var promises = [];

    // Dequeue all the known paths, generating resolver promises,
    // We'll add paths if we discover external package imports.
    while (allPaths.length) {
      var file;
      var parent = null;

      var candidate = allPaths.shift();

      // Some paths will have been extracted as imports from a file
      // and have information about their parent location we need to track.
      if (typeof candidate === 'object') {
        file = candidate.file;
        parent = candidate.parent;
      } else {
        file = candidate;
      }
      var promise = new Promise(async (accept, reject) => {
        resolver.resolve(file, parent, (err, body, absolutePath, source) => {
          (err)
            ? reject(err)
            : accept({ file: absolutePath, body: body, source: source });
        });
      });
      promises.push(promise);
    };

    // Resolve everything known and add it to the map, then inspect each file's
    // imports and add those to the list of paths to resolve if we don't have it.
    return Promise.all(promises).then(results => {

      // Generate the sources mapping
      results.forEach(item => mapping[item.file] = Object.assign({}, item));

      // Queue unknown imports for the next resolver cycle
      while (results.length) {
        var result = results.shift();

        // Inspect the imports
        var imports;
        try {
          imports = getImports(result.file, result, solc);
        } catch (err) {
          err.message = "Error parsing " + result[file] + ": " + err.message;
          return err;
        }

        // Detect unknown external packages / add them to the list of files to resolve
        // Keep track of location of this import because we need to report that.
        imports.forEach(item => {
          if (!mapping[item])
            allPaths.push({ file: item, parent: result.file });
        });
      };
      return mapping
    }).catch(err => {
      console.log('here', err)
      return err;
    });
  }

  while (allPaths.length) {
    resolvedResources = await generateMapping();
  }
  return resolvedResources;
}

let getImports = function (file, resolved, solc) {

  var imports = Parser.parseImports(resolved.body, solc);

  // Convert explicitly relative dependencies of modules back into module paths.
  return imports.map(dependencyPath => {
    return (isExplicitlyRelative(dependencyPath))
      ? resolved.source.resolve_dependency_path(file, dependencyPath)
      : dependencyPath;
  });
}

let listsEqual = function (listA, listB) {
  var a = listA.sort();
  var b = listB.sort();

  return JSON.stringify(a) === JSON.stringify(b);
}

let convert_to_absolute_paths = function (paths, base) {

  return paths.map(function (p) {
    if (path.isAbsolute(p)) {
      return p;
    }

    if (!isExplicitlyRelative(p)) {
      return p;
    }

    return path.resolve(path.join(base, p));
  });
}

let isExplicitlyRelative = function (import_path) {
  return import_path.indexOf(".") == 0;
}

module.exports = {
  updated,
  required_sources,
  resolveAllSources,
  getImports,
  listsEqual,
  convert_to_absolute_paths,
  isExplicitlyRelative

}
