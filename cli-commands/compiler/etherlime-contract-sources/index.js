const dir = require("node-dir");
const path = require("path");
const fs = require("fs");
const VYPER_EXTENSION = require('../vyper-compiler/config.js').VYPER_EXTENSION;
const SOL_EXTENSION = '.sol';


let find_contracts = async (workingPath) => {
  return new Promise(async (resolve, reject) => {

    if(workingPath.includes(VYPER_EXTENSION)) {
      return resolve({solFiles: [],vyperFiles:[workingPath]})
    }

    if(workingPath.includes(SOL_EXTENSION)) {
      if(!fs.existsSync(workingPath)) {
        return reject( new Error(`File '${process.cwd()}/${workingPath}' does not exist!`))
      }
      return resolve({solFiles:[workingPath], vyperFiles: []});
    }

    let solFiles = [];
    let vyperFiles = [];

    dir.files(workingPath, function (err, files) {
      if (err) {
        return reject(err);
      }

      return resolve(fetchSolAndVyperFiles(files))

    })

  });
}

const fetchSolAndVyperFiles = (files) => {
  let solFiles = [];
  let vyperFiles = [];

  files.forEach(file => {
    if (path.extname(file) == SOL_EXTENSION && path.basename(file)[0] != '.') solFiles.push(file)
    if (path.extname(file) == VYPER_EXTENSION && path.basename(file)[0] != '.') vyperFiles.push(file)
  })

  return {solFiles, vyperFiles}
}

module.exports = {find_contracts, fetchSolAndVyperFiles}


