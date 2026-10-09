const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  suite('Function convertHandler.getNum(input)', function() {
    test('Whole number input', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal number input', function(done) {
      let input = '3.2L';
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });

    test('Fractional input', function(done) {
      let input = '1/2L';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test('Fractional input with a decimal', function(done) {
      let input = '5.4/3L';
      assert.equal(convertHandler.getNum(input), 1.8);
      done();
    });

    test('Double-fraction input (error)', function(done) {
      let input = '3/2/3L';
      assert.isNull(convertHandler.getNum(input));
      done();
    });

    test('Default to 1 when no numerical input', function(done) {
      let input = 'L';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite('Function convertHandler.getUnit(input)', function() {
    test('Read each valid input unit', function(done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      let expect = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele), expect[i]);
      });
      done();
    });

    test('Return an error for invalid input unit', function(done) {
      let input = '34kilograms';
      assert.isNull(convertHandler.getUnit(input));
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('Return correct return unit for each valid input unit', function(done) {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    test('Return spelled-out string unit for each valid unit', function(done) {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function() {
    test('gal to L', function(done) {
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
      done();
    });

    test('L to gal', function(done) {
      assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
      done();
    });

    test('mi to km', function(done) {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
      done();
    });

    test('km to mi', function(done) {
      assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
      done();
    });

    test('lbs to kg', function(done) {
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
      done();
    });

    test('kg to lbs', function(done) {
      assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
      done();
    });
  });

});
