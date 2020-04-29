const crypto = require('crypto');
const conform = require('../fn/conform');
const constrain = require('../fn/constrain');
module.exports = {
    /**
     * Generate a random floating-point number in a given range
     * @param [min] - The minimum value for the random number
     * @param [max] - The maximum value for the random number
     * @returns {number} - The random number
     * @example
     * random(1, 10); // 2.5800829754088896 (varying)
     */
    random(min = 0, max = 1) {
        return Math.random() * (max - min + 1) + min;
    },

    /**
     * Generate a random integer in a given range
     * @param [min] - The minimum value for the random number
     * @param [max] - The maximum value for the random number
     * @returns {number} - The random number
     * @example
     * randomInt(1, 10); // 6 (varying)
     */
    randomInt(min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Generate a cryptographically secure random floating-point number in a given range
     * @param [min] - The minimum value for the random number
     * @param [max] - The maximum value for the random number
     * @returns {number} - The random number
     * @example
     * secureRandom(1, 10); // 6.4948807153850794 (varying)
     */
    secureRandom(min = 0, max = 1) {
        const range = max - min;
        const bits = Math.ceil(Math.log2(range));
        const bytes = constrain(Math.ceil(bits / 8), 4, 2 ** 31 - 1);
        const random = crypto
            .randomBytes(bytes)
            .readUInt32BE(0);
        return conform(random, 0, 2 ** 32, min, max);
    },

    /**
     * Generate a cryptographically secure random integer in a given range
     * @param [min] - The minimum value for the random number
     * @param [max] - The maximum value for the random number
     * @returns {number} - The random number
     * @example
     * secureRandomInt(1, 10); // 2 (varying)
     */
    secureRandomInt(min = 0, max = 1) {
        const range = max - min;
        const bits = Math.ceil(Math.log2(range));
        const bytes = constrain(Math.ceil(bits / 8), 4, 2 ** 31 - 1);
        const random = crypto
            .randomBytes(bytes)
            .readUInt32BE(0);
        return Math.floor(conform(random, 0, 2 ** 32, min, max));
    }
};