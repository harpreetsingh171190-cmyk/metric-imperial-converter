function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let numString = input.match(/[.\d\/]+/g);
    if (!numString) {
      return 1;
    }
    let numArray = numString[0].split('/');
    if (numArray.length > 2) {
      return undefined;
    }
    let num1 = numArray[0];
    let num2 = numArray[1];
    if (num2) {
      result = parseFloat(num1) / parseFloat(num2);
    } else {
      result = parseFloat(num1);
    }
    if (isNaN(result)) {
      return undefined;
    }
    return result;
  };

  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+$/);
    if (!result) return undefined;
    let unit = result[0].toLowerCase();
    let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(unit)) {
      return undefined;
    }
    return unit === 'l' ? 'L' : unit;
  };

  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case 'gal': return 'l';
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
    let unit = initUnit.toLowerCase();
    let result;
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
