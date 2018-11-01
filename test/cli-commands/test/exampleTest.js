const assert = require('chai').assert;
const fs = require('fs-extra');

describe('Example', () => {

    it('should have cli-commands folder', async () => {
       let isExists = fs.existsSync('./cli-commands')
       assert.isTrue(isExists)
    });
});