const crypto = require('crypto');
const conform = require('../fn/conform');
const constrain = require('../fn/constrain');

/**
 * Generate a cryptographically secure random integer in a given range
 * @param [min] - The minimum value for the random number
 * @param [max] - The maximum value for the random number
 * @returns {number} - The random number
 * @example
 * secureRandomInt(1, 10); // 2 (varying)
 */
module.exports = (min = 0, max = 1) => {
    const range = max - min;
    const bits = Math.ceil(Math.log2(range));
    const bytes = constrain(Math.ceil(bits / 8), 4, 2 ** 31 - 1);
    const random = crypto
        .randomBytes(bytes)
        .readUInt32BE(0);
    return Math.floor(conform(random, 0, 2 ** 32, min, max));
};