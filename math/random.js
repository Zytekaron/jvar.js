/**
 * Generate a random floating-point number in a given range
 * @param [min] - The minimum value for the random number
 * @param [max] - The maximum value for the random number
 * @returns {number} - The random number
 * @example
 * random(1, 10); // 2.5800829754088896 (varying)
 */
module.exports = (min = 0, max = 1) => Math.random() * (max - min) + min;