const logsStore = require('./../../logs-store/logs-store');
const utils = require('./../util');

let compiler = require("./etherlime-workflow-compile/index");
let Resolver = require("./etherlime-resolver/index");

const run = async (defaultPath) => {
    const initialRecordsCount = logsStore.getHistory().length;

    try {
        let resolverOptions = {
            "working_directory": `${defaultPath}/contracts`,
            "contracts_build_directory": `${defaultPath}/build`
        };

        Resolver(resolverOptions);

        let compileOptions = {
            "contracts_directory": `${defaultPath}/contracts`,
            "contracts_build_directory": `${defaultPath}/build`
        };

        compiler.compile(compileOptions, () => {});
        console.log(`Your compile script finished successfully!`);
    } catch (e) {
        if (!silent) {
            console.error(e);
        }

        console.log(`Your compile script finished with failure!`);
    }

    const records = logsStore.getHistory();

    if (records.length == initialRecordsCount) {
        return;
    }

    const currentRecord = records[records.length - 1];
    console.log(`\nHere is your report:`);
    utils.printReportTable(currentRecord.actions);
}

module.exports = {
    run
}