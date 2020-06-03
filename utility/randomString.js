const crypto = require('crypto');

/**
 * Generate a random string of a given length and character set
 * @param {number} length The length of the string to generate
 * @param {string|array} characters The characters to select from
 * @returns {string} A random string based on the input length and character set
 * @example
 * randomString(8, '0123456789abcdef'); // 'a72bd883'
 * randomString(16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // '7203812304121174'
 */
module.exports = (length, characters) => {
    // maximum valid value for modular division
    // to maintain a perfectly even distribution
    const maxValid = Math.floor(2 ** 16 / characters.length) * characters.length - 1;
    // the amount of entropy to generate for each pass
    const entropyLength = Math.ceil(length * 1.1) * 2;

    // an array of characters to be joined later
    let result = []; // ~35% faster than string concat using arrays
    // until the string is full
    while (result.length < length) {
        // generate entropy
        const entropy = crypto.randomBytes(entropyLength);

        // the entropy index
        let i = 0;
        while (i < entropyLength && result.length < length) {
            // read 2 bytes
            const value = entropy.readUInt16BE(i);
            i += 2;
            // ignore values that would create an uneven distribution
            if (value <= maxValid) {
                // safe distribution for modular division
                result.push(characters[value % characters.length]);
            }
        }
    }
    // join the result
    return result.join('');
};