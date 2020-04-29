/**
 * Calculate the factorial of a number
 * @param {number} num - The number to calculate the factorial of
 * @returns {number} - The factorial of the given number
 * @example
 * factorial(3); // 6
 * factorial(7); // 5040
 */
module.exports = function factorial(num) {
    if (num <= 1) return 1;
    return num * factorial(num - 1);
};