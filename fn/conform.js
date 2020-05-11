/**
 * Uniformly distribute a number from one range to another
 * @param {number} num - The number to conform
 * @param {number} imin - The minimum value for the input number
 * @param {number} imax - The maximum value for the input number
 * @param {number} omin - The minimum value for the output number
 * @param {number} omax - The maximum value for the output number
 * @returns {number} - The conformed number
 * @example
 * conform(10, 1, 10,  1, 1000); // 1000
 * conform(10, 1, 100, 1, 1000); // 100
 */
module.exports = (num, imin, imax, omin, omax) => omin + (omax - omin) * ((num - imin) / (imax - imin));