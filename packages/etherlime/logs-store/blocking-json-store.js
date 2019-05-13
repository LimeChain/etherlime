const fs = require('fs-extra')

/**
 * Database like JSON store
 */
class BlockingJSONStore {

	/**
	 * Instantiates a new JSON storage very similar to local storage in the browser
	 * 
	 * @param {*} path the path to save the file. Will be created if does not exist
	 */
	constructor(path) {
		this.path = `${process.cwd()}/${path}`;
		if (!fs.existsSync(path)) {
			fs.outputJsonSync(path, { data: {} });
		}
		this.store = require(this.path);
	}

	/**
	 * 
	 * get stored item by its key
	 * 
	 * @param {*} key the key to retrieve by
	 */
	get(key) {
		if (!key) {
			return this._clone(this.store.data);
		}
		return this._clone(this.store.data[key]);
	}

	/**
	 * 
	 * set item in the storage
	 * 
	 * @param {*} key the key to store by
	 * @param {*} value the object that is going to be stored there
	 */
	set(key, value) {
		this.store.data[key] = this._clone(value);
		this._save();
	}

	/**
	 * 
	 * remove item from the storage
	 * 
	 * @param {*} key the key to remove by
	 */
	remove(key) {
		delete this.store.data[key];
		this._save();
	}

	/**
	 * writes the data in the storage file
	 */
	_save() {
		fs.outputJsonSync(this.path, this.store);
	}

	/**
	 * Returns an array with all the stored properties in the JSON store
	 */
	list() {
		const keys = [];
		for (const key in this.store.data) {
			keys.push(this.store.data[key]);
		}
		return keys;
	}

	/**
	 * 
	 * Clone a data in order to use it
	 * 
	 * @param {*} data the data to be cloned
	 */
	_clone(data) {
		if (!data) {
			return undefined;
		}
		return JSON.parse(JSON.stringify(data));
	}

}

module.exports = function (path) {
	return new BlockingJSONStore(path);
}