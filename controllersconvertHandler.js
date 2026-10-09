function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const numberString = input.match(/[^a-zA-Z]+/g);
    if (!numberString) {
      return 1; // default to 1 if no number is provided
    }
    
    let numStr = numberString[0];
    let fractions = numStr.split('/');
    
    if (fractions.length > 2) {
      return undefined; // double fraction error
    }
    
    if (fractions.length === 1) {
      result = parseFloat(fractions[0]);
    } else {
      result = parseFloat(fractions[0]) / parseFloat(fractions[1]);
    }
    
    if (isNaN(result)) {
      return undefined;
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    const unitString = input.match(/[a-zA-Z]+/g);
    if (!unitString) {
      return undefined;
    }
    
    let unit = unitString[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (!validUnits.includes(unit)) {
      return undefined;
    }
    
    return unit === 'l' ? 'L' : unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case 'gal': return 'L';
      case 'l': return 'gal';
      case 'mi': return 'km';
      case 'km': return 'mi';
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
      default: return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    let u = unit.toLowerCase();
    switch (u) {
      case 'gal': return 'gallons';
      case 'l': return 'liters';
      case 'mi': return 'miles';
      case 'km': return 'kilometers';
      case 'lbs': return 'pounds';
      case 'kg': return 'kilograms';
      default: return 'unknown';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        return undefined;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let initString = this.spellOutUnit(initUnit);
    let returnString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initString} converts to ${returnNum} ${returnString}`;
  };
  
}

module.exports = ConvertHandler;