function ConvertHandler() {
  
  this.getNum = function(input) {
    if (!input) return 1;

    const unitIndex = input.search(/[a-zA-Z]/);
    const numStr = unitIndex === -1 ? input : input.slice(0, unitIndex);

    if (numStr.trim() === '') return 1;

    // Allow integer, decimal, fraction, or decimal fraction.
    const numberPattern = /^\d*\.?\d+(?:\/\d*\.?\d+)?$/;

    if (!numberPattern.test(numStr)) return undefined;

    const parts = numStr.split('/');

    if (parts.length === 1) {
      return Number(parts[0]);
    }

    const numerator = Number(parts[0]);
    const denominator = Number(parts[1]);

    if (denominator === 0) return undefined;

    return numerator / denominator;
  };

  this.getUnit = function(input) {
    let result;
    const unitIndex = input.search(/[a-zA-Z]/);
    if (unitIndex === -1) return undefined;
    
    let unit = input.slice(unitIndex).toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (!validUnits.includes(unit)) return undefined;
    return unit === 'l' ? 'L' : unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'l': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellMap = {
      'gal': 'gallons',
      'L': 'liters',
      'l': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    return spellMap[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return undefined;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
