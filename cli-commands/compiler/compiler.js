let compiler = require("./etherlime-workflow-compile/index");
let Resolver = require("./etherlime-resolver/index");
let colors = require("./../../utils/colors");

const run = async (defaultPath, runs, buildDir) => {
    defaultPath = `${process.cwd()}/${defaultPath}`;

    performCompilation(defaultPath, runs, buildDir);
}

const performCompilation = (defaultPath, runs, buildDir) => {
    var buildDirectoryPath = `${defaultPath}/build`;

    if (buildDir) {
        buildDirectoryPath = `${defaultPath}${buildDir}`;
    }

    let resolverOptions = {
        "working_directory": `${defaultPath}/contracts`,
        "contracts_build_directory": buildDirectoryPath
    };

    Resolver(resolverOptions);

    let compileOptions = {
        "contracts_directory": `${defaultPath}/contracts`,
        "contracts_build_directory": buildDirectoryPath
    };

    if (runs) {
        compileOptions.solc = {
            optimizer: {
                enabled: true,
                runs: runs
            }
        }
    }

    compiler.compile(compileOptions, (error, artifacts, paths) => {
        if (error) {
            var stack = error['stack'].split(',/');

            stack.forEach(message => {
                console.log(message);
            });

            return;
        }

        console.log(colors.colorSuccess('Compilation finished successfully'));
    });
}

module.exports = {
    run
}