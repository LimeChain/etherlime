var assert = require('assert')
let utils = {
    expectThrow: async promise => {
        try {
            let result = await promise;
            console.log(result);
        } catch (error) {
            const fileExist = error.message.search("LimeFactory.sol already exists in ./contracts directory. You've probably already initialized etherlime for this project.") >= 0;
            assert(fileExist || "Expected throw, got '" + error + "' instead");
            return
        }
        assert.fail('Expected throw not received')
    }
}

module.exports = utils
