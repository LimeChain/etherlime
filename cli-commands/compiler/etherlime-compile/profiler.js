var path = require("path");
var async = require("async");
var fs = require("fs");
var Graph = require("graphlib").Graph;
var Parser = require("./parser");
var expect = require("./../etherlime-expect");
var find_contracts = require("./../etherlime-contract-sources");

module.exports = {
  updated: function (options, callback) {
    expect.options(options, [
      "resolver"
    ]);

    var contracts_directory = options.contracts_directory;
    var build_directory = options.contracts_build_directory;

    function getFiles(done) {
      if (options.files) {
        done(null, options.files);
      } else {
        find_contracts(contracts_directory, done);
      }
    }

    var sourceFilesArtifacts = {};
    var sourceFilesArtifactsUpdatedTimes = {};

    var updatedFiles = [];

    async.series([
      function (c) {
        getFiles(function (error, files) {
          if (error) {
            return c(error);
          }

          files.forEach(function (sourceFile) {
            sourceFilesArtifacts[sourceFile] = [];
          });

          c();
        })
      },

      function (c) {
        fs.readdir(build_directory, function (error, build_files) {
          if (error) {
            if (error.message.indexOf("ENOENT: no such file or directory") >= 0) {
              build_files = [];
            } else {
              return c(error);
            }
          }

          build_files = build_files.filter(function (build_file) {
            return path.extname(build_file) == ".json";
          });

          async.map(build_files, function (buildFile, finished) {
            fs.readFile(path.join(build_directory, buildFile), "utf8", function (error, body) {
              if (error) return finished(error);
              finished(null, body);
            });
          }, function (error, jsonData) {
            if (error) return c(error);

            try {
              for (var i = 0; i < jsonData.length; i++) {
                var data = JSON.parse(jsonData[i]);

                if (sourceFilesArtifacts[data.sourcePath] == null) {
                  sourceFilesArtifacts[data.sourcePath] = [];
                }

                sourceFilesArtifacts[data.sourcePath].push(data);
              }
            } catch (e) {
              return c(e);
            }

            c();
          });
        });
      },
      function (c) {
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

        c();
      },

      function (c) {
        var sourceFiles = Object.keys(sourceFilesArtifacts);

        async.map(sourceFiles, function (sourceFile, finished) {
          fs.stat(sourceFile, function (error, stat) {
            if (error) {
              stat = null;
            }

            finished(null, stat);
          });
        }, function (error, sourceFileStats) {
          if (error) {
            return callback(error);
          }

          sourceFiles.forEach(function (sourceFile, index) {
            var sourceFileStat = sourceFileStats[index];

            if (sourceFileStat == null) {
              return;
            }

            var artifactsUpdatedTime = sourceFilesArtifactsUpdatedTimes[sourceFile] || 0;
            var sourceFileUpdatedTime = (sourceFileStat.mtime || sourceFileStat.ctime).getTime();

            if (sourceFileUpdatedTime > artifactsUpdatedTime) {
              updatedFiles.push(sourceFile);
            }
          });

          c();
        });
      }
    ], function (error) {
      callback(error, updatedFiles);
    });
  },

  required_sources: function (options, callback) {
    var self = this;

    expect.options(options, [
      "paths",
      "base_path",
      "resolver"
    ]);

    var paths = this.convert_to_absolute_paths(options.paths, options.base_path);

    function findRequiredSources(dependsGraph, done) {

      var required = {};

      function hasBeenTraversed(import_path) {
        return required[import_path] != null;
      }

      function include(import_path) {
        required[import_path] = dependsGraph.node(import_path);
      }

      function walk_down(import_path) {
        if (hasBeenTraversed(import_path)) {
          return;
        }

        include(import_path);

        var dependencies = dependsGraph.successors(import_path);

        if (dependencies.length > 0) {
          dependencies.forEach(walk_down);
        }
      }

      function walk_from(import_path) {
        if (hasBeenTraversed(import_path)) {
          return;
        }

        var ancestors = dependsGraph.predecessors(import_path);
        var dependencies = dependsGraph.successors(import_path);

        include(import_path);

        if (ancestors && ancestors.length > 0) {
          ancestors.forEach(walk_from);
        }

        if (dependencies && dependencies.length > 0) {
          dependencies.forEach(walk_down);
        }
      }

      paths.forEach(walk_from);

      done(null, required);
    }

    find_contracts(options.base_path, function (error, allPaths) {
      if (error) {
        return callback(error);
      }

      allPaths = allPaths.concat(paths);

      self.dependency_graph(allPaths, options.resolver, function (error, dependsGraph) {
        if (error) {
          return callback(error);
        }

        findRequiredSources(dependsGraph, callback);
      });
    });
  },

  convert_to_absolute_paths: function (paths, base) {
    var self = this;

    return paths.map(function (p) {
      if (path.isAbsolute(p)) {
        return p;
      }

      if (!self.isExplicitlyRelative(p)) {
        return p;
      }

      return path.resolve(path.join(base, p));
    });
  },

  isExplicitlyRelative: function (import_path) {
    return import_path.indexOf(".") == 0;
  },

  dependency_graph: function (paths, resolver, callback) {
    var self = this;

    var dependsGraph = new Graph();

    var imports_cache = {};

    paths = paths.map(function (p) {
      return [p, null];
    });

    async.whilst(function () {
      return paths.length > 0;
    }, function (finished) {
      var current = paths.shift();
      var import_path = current[0];
      var imported_from = current[1];

      if (dependsGraph.hasNode(import_path) && imports_cache[import_path] != null) {
        return finished();
      }

      resolver.resolve(import_path, imported_from, function (error, resolved_body, resolved_path, source) {
        if (error) return finished(error);

        if (dependsGraph.hasNode(resolved_path) && imports_cache[resolved_path] != null) {
          return finished();
        }

        dependsGraph.setNode(resolved_path, resolved_body);

        var imports;

        try {
          imports = Parser.parseImports(resolved_body);
        } catch (e) {
          e.message = ` Error parsing ${import_path} : ${e.message}`;
          return finished(e);
        }

        imports = imports.map(function (dependency_path) {
          if (self.isExplicitlyRelative(dependency_path)) {
            dependency_path = source.resolve_dependency_path(import_path, dependency_path);
          }

          if (!dependsGraph.hasEdge(import_path, dependency_path)) {
            dependsGraph.setEdge(import_path, dependency_path);
          }

          return [dependency_path, import_path];
        });

        imports_cache[import_path] = imports;

        Array.prototype.push.apply(paths, imports);

        finished();
      });
    },
      function (error) {
        if (error) return callback(error);
        callback(null, dependsGraph)
      });
  },

  defined_contracts: function (directory, callback) {
    function getFiles(callback) {
      if (Array.isArray(directory)) {
        callback(null, directory);
      } else {
        find_contracts(directory, callback);
      }
    }

    getFiles(function (error, files) {
      if (error) return callback(error);

      var promises = files.map(function (file) {
        return new Promise(function (accept, reject) {
          fs.readFile(file, "utf8", function (error, body) {
            if (error) return reject(error);

            var output;

            try {
              output = Parser.parse(body);
            } catch (e) {
              e.message = `Error parsing ${file} : ${e.message}`;
              
              return reject(e);
            }

            accept(output.contracts);
          });
        }).then(function (contract_names) {
          var returnVal = {};

          contract_names.forEach(function (contract_name) {
            returnVal[contract_name] = file;
          });

          return returnVal;
        });
      });

      Promise.all(promises).then(function (objects) {
        var contract_source_paths = {};

        objects.forEach(function (object) {
          Object.keys(object).forEach(function (contract_name) {
            contract_source_paths[contract_name] = object[contract_name];
          });
        });

        callback(null, contract_source_paths);
      }).catch(callback);
    });
  }
};
