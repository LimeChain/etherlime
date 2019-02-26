const path = require("path");

const fs = require("fs");
const Parser = require("./parser");
const expect = require("./../etherlime-expect");
const find_contracts = require("./../etherlime-contract-sources");

const CompilerSupplier = require("./compilerSupplier");

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
      try {
        let files = await find_contracts(contracts_directory);
        return files;
      } catch (e) {
        throw e;
      }
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
      throw e;
    }
  }

  let readFiles = async () => {
    return new Promise(async (accept, reject) => {
      try {
        let build_files;
        try {
          build_files = fs.readdirSync(build_directory);
        } catch (error) {

          if (error.message.indexOf("ENOENT: no such file or directory") >= 0) {
            build_files = [];
          } else {
            return reject(error);
          }
    
        }
        build_files = build_files.filter(function (build_file) {
          return path.extname(build_file) == ".json";
        });
        let jsonData = await prepareBuildFiles(build_files, build_directory);
        for (let i = 0; i < jsonData.length; i++) {
          let data = JSON.parse(jsonData[i]);

          if (sourceFilesArtifacts[data.sourcePath] == null) {
            sourceFilesArtifacts[data.sourcePath] = [];
          }

          sourceFilesArtifacts[data.sourcePath].push(data);
        }
        accept();
      }
      catch (error) {
        return reject(error)
      }
    });
  }

  let prepareBuildFiles = async (build_files, build_directory) => {
    let body = [];
    build_files.forEach(buildFile => {
      try {
        body.push(fs.readFileSync(path.join(build_directory, buildFile)));
      } catch (e) {
        throw e
      }
    });
    return body;
  }

  let prepareArtifacts = async () => {
    Object.keys(sourceFilesArtifacts).forEach(function (sourceFile) {
      let artifacts = sourceFilesArtifacts[sourceFile];

      sourceFilesArtifactsUpdatedTimes[sourceFile] = artifacts.reduce(function (minimum, current) {
        let updatedAt = new Date(current.updatedAt).getTime();

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
      let sourceFiles = Object.keys(sourceFilesArtifacts);
      let sourceFileStats = await prepareUpdateFiles(sourceFiles);

      sourceFiles.forEach(function (sourceFile, index) {
        let sourceFileStat = sourceFileStats[index];

        if (sourceFileStat == null) {
          return;
        }

        let artifactsUpdatedTime = sourceFilesArtifactsUpdatedTimes[sourceFile] || 0;
        let sourceFileUpdatedTime = (sourceFileStat.mtime || sourceFileStat.ctime).getTime();

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
        let stat;
        try {
          stat = fs.statSync(sourceFile);
        } catch (e) {
          stat = null;
        }
        stats.push(stat);
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
    throw (e);
  }
}

let required_sources = async function (options) {
  return new Promise(async (accept, reject) => {

    expect.options(options, [
      "paths",
      "base_path",
      "resolver"
    ]);

    let resolver = options.resolver;

    // Fetch the whole contract set
    let allPathsInitial;
    try {
      allPathsInitial = await find_contracts(options.contracts_directory);
    } catch (e) {
      return reject(e)
    }

    options.paths.forEach(_path => {
      if (!allPathsInitial.includes(_path)) {
        allPathsInitial.push(_path)
      }
    });
    let updates = convert_to_absolute_paths(options.paths, options.base_path).sort();
    let allPaths = convert_to_absolute_paths(allPathsInitial, options.base_path).sort();

    let allSources = {};
    let compilationTargets = [];

    const supplier = new CompilerSupplier(options.compilers.solc)
    supplier.load().then(async solc => {

      // Get all the source code
      try {
        let resolved = await resolveAllSources(resolver, allPaths, solc);
        // Generate hash of all sources including external packages - passed to solc inputs.
        let resolvedPaths = Object.keys(resolved);
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
          let currentUpdate = updates.shift();
          let files = allPaths.slice();
          while (files.length > 0) {
    
            let currentFile = files.shift();
            // Ignore targets already selected.

            if (compilationTargets.includes(currentFile)) {
              continue
            }

            let imports;
            try {
              imports = getImports(currentFile, resolved[currentFile], solc);
            } catch (err) {
              err.message = "Error parsing " + currentFile + ": " + err.message;
              return reject(err)
            }
            
            // If file imports a compilation target, add it
            // to list of updates and compilation targets
            if (imports.includes(currentUpdate)) {
              updates.push(currentFile);
              compilationTargets.push(currentFile);
            }
          }
        }
        accept(allSources, compilationTargets)

      } catch (err) {
        return reject(err);
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
        try {
          let result = await resolver.resolve(file, parent);
          accept({ file: result.resolved_path, body: result.resolved_body, source: result.current_source });
        } catch (err) {
          reject(err)
        }
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
          throw err;
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
      throw err;
    });
  }

  while (allPaths.length) {
    try {
      resolvedResources = await generateMapping();
      //return resolvedResources;
    } catch (e) {
      throw e;
    }
  }
  return resolvedResources;
}

let getImports = function (file, resolved, solc) {
  let imports = Parser.parseImports(resolved.body, solc);

  // Convert explicitly relative dependencies of modules back into module paths.
  return imports.map(dependencyPath => {
    return (isExplicitlyRelative(dependencyPath))
      ? resolved.source.resolve_dependency_path(file, dependencyPath)
      : dependencyPath;
  });
}

let listsEqual = function (listA, listB) {
  let a = listA.sort();
  let b = listB.sort();

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
