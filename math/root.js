/**
 * Calculate the nth root of a number
 * @param {number} num - the number to calculate the root of
 * @param {number} root - The root
 * @returns {number} - The resulting number
 * @example
 * root(625, 4); // 5
 * root(64, 3); // 8
 */
module.exports = (num, root) => Math.pow(num, 1 / root);