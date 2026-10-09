function ConvertHandler() {
  
  this.getNum = function(input) {
    if (!input) return 1;
    
    // Find where the unit begins (first alphabetic character)
    const unitIndex = input.search(/[a-zA-Z]/);
    let numStr = unitIndex === -1 ? input : input.slice(0, unitIndex);
    
    // Default to 1 if no number is provided
    if (numStr.trim() === '') return 1;
    
    // Check for double fractions or multiple slashes
    const slashes = numStr.split('/');
    if (slashes.length > 2) return null;
    
    // Handle fraction (e.g. "1/2" or "2.5/6")
    if (slashes.length === 2) {
      const num = parseFloat(slashes[0]);
      const den = parseFloat(slashes[1]);
      if (isNaN(num) || isNaN(den) || den === 0) return null;
      return num / den;
    }
    
    // Handle plain decimal/integer
    const result = parseFloat(numStr);
    return isNaN(result) ? null : result;
  };
  
  this.getUnit = function(input) {
    if (!input) return null;
    
    const unitIndex = input.search(/[a-zA-Z]/);
    if (unitIndex === -1) return null;
    
    const unit = input.slice(unitIndex).toLowerCase();
    
    // Map valid units, keeping 'L' uppercase
    const validUnits = {
      gal: 'gal',
      l: 'L',
      mi: 'mi',
      km: 'km',
      lbs: 'lbs',
      kg: 'kg'
    };
    
    return validUnits[unit] || null;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return unitMap[initUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    const spellMap = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return spellMap[unit] || null;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
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
        return null;
    }
    
    // Round to 5 decimal places
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
  
}

module.exports = ConvertHandler;
