const Schema = require("./../etherlime-contract-schema");
const fs = require("fs-extra");
const path = require("path");
const _ = require("lodash");

class Artifactor {

  /**
	 * @param {*} destination destination of the contracts build directory 
	 */

  constructor (destination) {
    this.destination = destination
  }


  async save (object) {
    const self = this;

    object = Schema.normalize(object);

    if (object.contractName == null) {
      throw new Error('You must specify a contract name.');
    }

    let output_path = object.contractName;

    output_path = path.join(self.destination, output_path);
    output_path = path.resolve(output_path);
    output_path = `${output_path}.json`;

    let finalObject = object;
    
    try {
      let json = await fs.readFile(output_path, { encoding: "utf8" });

      let existingObjDirty = JSON.parse(json);

      finalObject = Schema.normalize(existingObjDirty);
      let finalNetworks = {};

      _.merge(finalNetworks, finalObject.networks, object.networks);
      _.assign(finalObject, object);

      finalObject.networks = finalNetworks;
    
    } catch (error) {
       
    }

    finalObject.updatedAt = new Date().toISOString();
    await fs.outputFile(output_path, JSON.stringify(finalObject, null, 2), "utf8");

  }


  async saveAll (objects) {
    const self = this;

    if (Array.isArray(objects)) {
      let array = objects;
      objects = {};   

      array.forEach((item) => {
        objects[item.contract_name] = item;
      })
    }
    
    try {
      await fs.stat(self.destination);

      let promises = [];

      Object.keys(objects).forEach((contractName) => {
        let object = objects[contractName];

        object.contractName = contractName;
        promises.push(self.save(object));
      });
      
      return Promise.all(promises);

    } catch (error) {
      throw new Error(`Destination ${self.destination}`);
    }
  }

}

module.exports = Artifactor;
