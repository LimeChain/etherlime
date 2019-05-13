"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const cli_table_2_json_1 = require("cli-table-2-json");
const nodeify_ts_1 = require("nodeify-ts");
const os = require("os");
const exec = child_process.exec;
const extractResult = function (result) {
    const extracterArray = [
        {
            re: / ls /,
            run(resultp) {
                const obj = JSON.parse(resultp.raw);
                const lines = obj.split(os.EOL);
                resultp.machineList = cli_table_2_json_1.cliTable2Json(lines);
                return resultp;
            },
        },
        {
            re: / config /,
            run(resultp) {
                const obj = JSON.parse(resultp.raw);
                const str = obj;
                const config = str.split(os.EOL).join(" ");
                const extractValue = function (strp, name, rep) {
                    const re = rep || new RegExp("--" + name + '="([\\S]*)"', "i");
                    const m = re.exec(strp);
                    if (m !== null) {
                        if (m.index === re.lastIndex) {
                            re.lastIndex++;
                        }
                    }
                    return (m && m[1]) ? m[1] : null;
                };
                resultp.machine = {
                    config,
                    host: extractValue(str, null, /-H=tcp:\/\/(.*):/),
                    port: extractValue(str, null, /-H=tcp:\/\/.*:(\d*)/),
                    tlscacert: extractValue(str, "tlscacert"),
                    tlscert: extractValue(str, "tlscert"),
                    tlskey: extractValue(str, "tlskey"),
                    tlsverify: function (strp) {
                        const re = /--tlsverify/;
                        const m = re.exec(strp);
                        if (m !== null) {
                            if (m.index === re.lastIndex) {
                                re.lastIndex++;
                            }
                        }
                        return (m && m[0] && m[0] === "--tlsverify") || false;
                    }(str),
                };
                return resultp;
            },
        },
        {
            re: / inspect /,
            run(resultp) {
                try {
                    const obj = JSON.parse(resultp.raw);
                    resultp.machine = JSON.parse(obj);
                }
                catch (e) {
                }
                return resultp;
            },
        },
    ];
    extracterArray.forEach(function (extracter) {
        const re = extracter.re;
        const str = result.command;
        const m = re.exec(str);
        if (m !== null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            return extracter.run(result);
        }
    });
    return result;
};
class DockerMachine {
    constructor(options = new Options()) {
        this.options = options;
    }
    command(command, callback) {
        const dockerMachine = this;
        let execCommand = "docker-machine " + command;
        const promise = Promise.resolve().then(function () {
            const params = dockerMachine.options.toParams();
            execCommand += " " + params;
            const execOptions = {
                cwd: dockerMachine.options.currentWorkingDirectory,
                env: {
                    DEBUG: "",
                    HOME: process.env.HOME,
                    PATH: process.env.PATH,
                },
                maxBuffer: 200 * 1024 * 1024,
            };
            return new Promise(function (resolve, reject) {
                exec(execCommand, execOptions, (error, stdout, stderr) => {
                    if (error) {
                        const message = `error: '${error}' stdout = '${stdout}' stderr = '${stderr}'`;
                        console.error(message);
                        reject(message);
                    }
                    resolve(stdout);
                });
            });
        }).then(function (data) {
            const result = {
                command: execCommand,
                raw: JSON.stringify(data),
            };
            return extractResult(result);
        });
        return nodeify_ts_1.default(promise, callback);
    }
}
exports.DockerMachine = DockerMachine;
class Options {
    constructor(keyValueObject = {}, currentWorkingDirectory = null) {
        this.keyValueObject = keyValueObject;
        this.currentWorkingDirectory = currentWorkingDirectory;
    }
    toParams() {
        const result = Object.keys(this.keyValueObject).reduce((previous, key) => {
            const value = this.keyValueObject[key];
            return `${previous} --${key} ${value}`;
        }, "");
        return result;
    }
}
exports.Options = Options;
//# sourceMappingURL=index.js.map