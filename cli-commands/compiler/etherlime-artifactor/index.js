var Schema = require("./../etherlime-contract-schema");
var fs = require("fs-extra");
var path = require("path");
var _ = require("lodash");

function Artifactor(destination) {
  this.destination = destination;
};

Artifactor.prototype.save = function (object) {
  var self = this;

  return new Promise(function (accept, reject) {
    object = Schema.normalize(object);

    if (object.contractName == null) {
      return reject(new Error('You must specify a contract name.'));
    }

    var output_path = object.contractName;

    output_path = path.join(self.destination, output_path);
    output_path = path.resolve(output_path);

    output_path = `${output_path}.json`;

    fs.readFile(output_path, { encoding: "utf8" }, function (error, json) {
      var finalObject = object;

      if (!error) {
        var existingObjDirty;
        try {
          existingObjDirty = JSON.parse(json);
        } catch (e) {
          reject(e);
        }

        finalObject = Schema.normalize(existingObjDirty);

        var finalNetworks = {};
        _.merge(finalNetworks, finalObject.networks, object.networks);

        _.assign(finalObject, object);
        finalObject.networks = finalNetworks;
      }

      finalObject.updatedAt = new Date().toISOString();

      fs.outputFile(output_path, JSON.stringify(finalObject, null, 2), "utf8", function (error) {
        if (error) {
          return reject(error);
        }

        accept();
      });
    });
  });
};

Artifactor.prototype.saveAll = function (objects) {
  var self = this;

  if (Array.isArray(objects)) {
    var array = objects;
    objects = {};

    array.forEach(function (item) {
      objects[item.contract_name] = item;
    })
  }

  return new Promise(function (accept, reject) {
    fs.stat(self.destination, function (error, stat) {
      if (error) {
        return reject(new Error(`Destination ${self.destination} doesn't exist!`));
      }
      
      accept();
    });
  }).then(function () {
    var promises = [];

    Object.keys(objects).forEach(function (contractName) {
      var object = objects[contractName];
      
      object.contractName = contractName;
      promises.push(self.save(object));
    });

    return Promise.all(promises);
  });
};

module.exports = Artifactor;
