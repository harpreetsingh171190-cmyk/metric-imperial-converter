
this.getNum = function(input) {
  if (!input) return 1;

  const unitIndex = input.search(/[a-zA-Z]/);
  const numStr = unitIndex === -1 ? input : input.slice(0, unitIndex);

  if (numStr.trim() === '') return 1;

  // Allow integer, decimal, fraction, or decimal fraction.
  const numberPattern = /^\d*\.?\d+(?:\/\d*\.?\d+)?$/;

  if (!numberPattern.test(numStr)) return null;

  const parts = numStr.split('/');

  if (parts.length === 1) {
    return Number(parts[0]);
  }

  const numerator = Number(parts[0]);
  const denominator = Number(parts[1]);

  if (denominator === 0) return null;

  return numerator / denominator;
};
