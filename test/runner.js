var cronli5 = require('..');
var expect = require('chai').expect;

module.exports = {
  run: function runEqualityTests(tests, defaultExpected) {
    tests.forEach(function(values) {
      var cronable = values[0];
      var expected = values[1] || defaultExpected;

      equal(cronable, expected);
    });
  },
  error: function runErrorTests(tests, defaultErrorText) {
    tests.forEach(function(inputAndError) {
      if (!(inputAndError instanceof Array)) {
        inputAndError = [inputAndError];
      }

      var badInput = inputAndError[0];
      var errorText = inputAndError[1] || defaultErrorText;

      throwsError(badInput, errorText);
    });
  }
};

// Check that the output matches the input for a given cron pattern.
function equal(cronable, expected) {
  describe('"' + cronable + '"', function() {
    it('should return a string', function() {
      expect(cronli5(cronable)).to.be.a('string');
    });

    it('should not be an empty string', function() {
      expect(cronli5(cronable)).to.not.be.empty;
    });

    it('should be "' + expected + '"', function() {
      expect(cronli5(cronable)).to.equal(expected);
    });
  });
}

// Check that bad input throws the expected error.
function throwsError(badInput, errorText) {
  describe(JSON.stringify(badInput), function() {
    it('should throw an error', function() {
      expect(cronli5.bind(null, badInput)).to.throw(Error);
    });

    if (errorText) {
      it('should throw "' + errorText + '".', function() {
        expect(cronli5.bind(null, badInput)).to.throw(errorText);
      });
    }
  });
}
