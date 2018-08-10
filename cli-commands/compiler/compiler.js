let compiler = require("./etherlime-workflow-compile/index");
let Resolver = require("./etherlime-resolver/index");
let colors = require("./../../utils/colors");

const run = async (defaultPath, runs, solcVersion, useDocker) => {
    defaultPath = `${process.cwd()}/${defaultPath}`;

    return performCompilation(defaultPath, runs, solcVersion, useDocker);
}

const performCompilation = async (defaultPath, runs, solcVersion, useDocker) => {
    if (useDocker && !solcVersion) {
        throw new Error('In order to use the docker, please set an image name: --solcVersion=<image-name>');
    }

    let compilerSolcOptions = {
        solc: {
            version: solcVersion,
            docker: useDocker
        }
    };

    let resolverOptions = {
        "working_directory": `${defaultPath}/contracts`,
        "contracts_build_directory": `${defaultPath}/build`,
        "compilers": compilerSolcOptions
    };

    Resolver(resolverOptions);

    let compileOptions = {
        "contracts_directory": `${defaultPath}/contracts`,
        "contracts_build_directory": `${defaultPath}/build`,
        "compilers": compilerSolcOptions
    };

    if (runs) {
        compileOptions.solc = {
            optimizer: {
                enabled: true,
                runs: runs
            }
        }
    }

    return compilePromise(compileOptions);
}

const compilePromise = async (compileOptions) => {

    return new Promise((resolve, reject) => {
        compiler.compile(compileOptions, (error, artifacts, paths) => {
            if (error) {
                var stack = error['stack'].split(',/');
    
                stack.forEach(message => {
                    console.log(message);
                });

                reject(stack);
    
                return;
            }
    
            console.log(colors.colorSuccess('Compilation finished successfully'));
            resolve();
        });
    });
}

module.exports = {
    run
}