const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  suite('Function convertHandler.getNum(input)', function() {
    test('convertHandler should correctly read a whole number input.', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('convertHandler should correctly read a decimal number input.', function(done) {
      let input = '3.2L';
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });

    test('convertHandler should correctly read a fractional input.', function(done) {
      let input = '1/2L';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test('convertHandler should correctly read a fractional input with a decimal.', function(done) {
      let input = '5.4/3L';
      assert.equal(convertHandler.getNum(input), 1.8);
      done();
    });

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function(done) {
      let input = '3/2/3L';
      assert.isNull(convertHandler.getNum(input));
      done();
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function(done) {
      let input = 'L';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite('Function convertHandler.getUnit(input)', function() {
    test('convertHandler should correctly read each valid input unit.', function(done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      let expect = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele), expect[i]);
      });
      done();
    });

    test('convertHandler should correctly return an error for an invalid input unit.', function(done) {
      let input = '34kilograms';
      assert.isNull(convertHandler.getUnit(input));
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('convertHandler should return the correct return unit for each valid input unit.', function(done) {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function(done) {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function() {
    test('convertHandler should correctly convert gal to L.', function(done) {
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
      done();
    });

    test('convertHandler should correctly convert L to gal.', function(done) {
      assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
      done();
    });

    test('convertHandler should correctly convert mi to km.', function(done) {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
      done();
    });

    test('convertHandler should correctly convert km to mi.', function(done) {
      assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
      done();
    });

    test('convertHandler should correctly convert lbs to kg.', function(done) {
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
      done();
    });

    test('convertHandler should correctly convert kg to lbs.', function(done) {
      assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
      done();
    });
  });

});
