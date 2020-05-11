/**
 * Generate a random integer in a given range
 * @param [min] - The minimum value for the random number
 * @param [max] - The maximum value for the random number
 * @returns {number} - The random number
 * @example
 * randomInt(1, 10); // 6 (varying)
 */
module.exports = (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1)) + min;