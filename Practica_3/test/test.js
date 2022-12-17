var assert = require('assert');
const { calcTest } = require('../src/calculator');

describe('Calculator', function () {
  describe('Simple addition', function () {
    it('Should return 2 in simple addition.', function () {
      let result = calcTest(1, 2);
      assert.equal(result, 2)
    });
  });
});
