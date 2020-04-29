/**
 * Calculate a number in the fibonacci sequence
 * @param {number} num - The position of the number to calculate
 * @returns {number} - The fibonacci value at the given position
 * @example
 * fibonacci(4); // 3
 * fibonacci(8); // 34
 */
module.exports = function fibonacci(num) {
    if (num <= 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
};