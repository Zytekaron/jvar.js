/**
 * Constrain a number to a certain range
 * @param {number} num - The number to constrain
 * @param {number} min - The minimum possible value
 * @param {number} max - The maximum possible value
 * @returns {number} - The constrained number
 * constrain(5,  10, 20); // 10
 * constrain(15, 10, 20); // 15
 * constrain(25, 10, 20); // 20
 */
module.exports = (num, min, max) => num < min ? min : num > max ? max : num;