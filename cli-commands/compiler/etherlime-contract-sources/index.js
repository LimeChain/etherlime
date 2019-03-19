const dir = require("node-dir");
const path = require("path");
const fs = require("fs");

let find_contracts = async (workingPath) => {
  return new Promise(async (resolve, reject) => {

    if(workingPath.includes('.vy')) {
      return resolve({'solFiles': [],'vyperFiles':[workingPath]})
    }

    if(workingPath.includes('.sol')) {
      if(!fs.existsSync(workingPath)) {
        return reject( new Error(`File "${process.cwd()}/${workingPath}" does not exist!`))
      }
      return resolve({'solFiles':[workingPath], 'vyperFiles': []});
    }

    let solFiles = [];
    let vyperFiles = [];

    dir.files(workingPath, function (err, files) {
      if (err) {
        return reject(err);
      }

      files.forEach(file => {
        if (path.extname(file) == ".sol" && path.basename(file)[0] != ".") solFiles.push(file)
        if (path.extname(file) == ".vy" && path.basename(file)[0] != ".") vyperFiles.push(file)
      })


      // if(vyperFiles) vyperCompiler(vyperFiles)
      return resolve({solFiles, vyperFiles});
    })

    // let isFile = workingPath.includes('.sol');

    // if (!isFile) {
    //   let solFiles = [];
    //   let vyperFiles = [];

    //   dir.files(workingPath, function (err, files) {
    //     if (err) {
    //       return reject(err);
    //     }

    //     files.forEach(file => {
    //       if (path.extname(file) == ".sol" && path.basename(file)[0] != ".") solFiles.push(file)
    //       if (path.extname(file) == ".vy" && path.basename(file)[0] != ".") vyperFiles.push(file)
    //     })


    //     if(vyperFiles) vyperCompiler(vyperFiles)

    //     return resolve(solFiles);
    //   })
    // } else {
    //   if(!fs.existsSync(workingPath)) {
    //     return reject( new Error(`File "${process.cwd()}/${workingPath}" does not exist!`))
    //   }
    //   return resolve([workingPath]);
    // }

  });
}

module.exports = find_contracts


