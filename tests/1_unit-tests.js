const chai = require('chai');
const assert = chai.assert;

const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

describe('Unit Tests', function(){
  
  // #1
  test('Whole number input', function(done) {
    let input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
    done();
  });

  // #2
  test('Decimal number input', function(done) {
    let input = '3.2L';
    assert.equal(convertHandler.getNum(input), 3.2);
    done();
  });

  // #3
  test('Fractional input', function(done) {
    let input = '1/2L';
    assert.equal(convertHandler.getNum(input), 0.5);
    done();
  });

  // #4
  test('Fractional input with a decimal', function(done) {
    let input = '5.4/3L';
    assert.equal(convertHandler.getNum(input), 1.8);
    done();
  });

  // #5
  test('Double fraction input (error)', function(done) {
    let input = '3/2/3L';
    assert.isUndefined(convertHandler.getNum(input));
    done();
  });

  // #6
  test('Default to 1 when no numerical input is provided', function(done) {
    let input = 'kg';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });

  // #7
  test('Read each valid input unit', function(done) {
    let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    input.forEach(function(ele) {
      assert.equal(convertHandler.getUnit(ele), ele === 'l' || ele === 'L' ? 'L' : ele.toLowerCase());
    });
    done();
  });

  // #8
  test('Return an error for an invalid input unit', function(done) {
    let input = '32g';
    assert.isUndefined(convertHandler.getUnit(input));
    done();
  });

  // #9
  test('Return the correct return unit for each valid input unit', function(done) {
    let input = ['gal','l','mi','km','lbs','kg'];
    let expect = ['L','gal','km','mi','kg','lbs'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
    });
    done();
  });

  // #10
  test('Return the spelled-out string unit for each valid input unit', function(done) {
    let input = ['gal','l','mi','km','lbs','kg'];
    let expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
    });
    done();
  });

  // #11
  test('Correctly convert gal to L', function(done) {
    let input = [5, 'gal'];
    let expected = 18.92705;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  // #12
  test('Correctly convert L to gal', function(done) {
    let input = [5, 'l'];
    let expected = 1.32086;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  // #13
  test('Correctly convert mi to km', function(done) {
    let input = [5, 'mi'];
    let expected = 8.0467;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  // #14
  test('Correctly convert km to mi', function(done) {
    let input = [5, 'km'];
    let expected = 3.10686;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  // #15
  test('Correctly convert lbs to kg', function(done) {
    let input = [5, 'lbs'];
    let expected = 2.26796;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  // #16
  test('Correctly convert kg to lbs', function(done) {
    let input = [5, 'kg'];
    let expected = 11.02312;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

});
