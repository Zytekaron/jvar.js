const randomString = require('../utility/randomString');

/**
 * A JavaScript implementation of One Time Pad, a 100% secure algorithm for encrypted message exchange
 */
module.exports = class OneTimePad {
    /**
     * Create a OneTimePad
     * Usage: https://hastebin.tk/ahoperumul.js
     * @param {string} characters The character set to encode and decode with
     * @param {boolean} includeSpace Whether or not to include a space at the end of the character set
     */
    constructor(
        characters = OneTimePad.DEFAULT_CHARACTERS,
        includeSpace = false
    ) {
        if (includeSpace && !characters.includes(' ')) {
            characters += ' ';
        }
        this.characters = characters;
    }

    /**
     * Encode a message using a single-use key.
     * If a key is not provided, one will be generated and returned.
     * You may append to the message and it will not affect the result.
     *
     * Security Tips:
     * Do not use the same key twice, ever!
     * Do not save the key once you have enciphered a message!
     * @param {string} message The message to encode
     * @param {string|null} key The single-use key to encode with
     * @returns {object|string} The encoded message
     */
    encode(message, key) {
        const obj = key == null;
        if (obj) key = this.generateKey(message.length);
        let output = '';
        for (let i = 0; i < key.length; i++) {
            const letterIndex = this.characters.indexOf(message[i]);
            const keyIndex = this.characters.indexOf(key[i]);
            this._checkIndex(letterIndex, keyIndex, i);
            const out = this._rollover(letterIndex + keyIndex);
            output += this.characters.charAt(out);
        }
        return obj ? { message: output, key } : output;
    }

    /**
     * Decode a message using a single-use key.
     * The message may be longer than the key.
     *
     * Security Tips:
     * Do not use the same key twice, ever!
     * Do not save the key once you have enciphered a message!
     * @param {string} message The message to encode
     * @param {string|null} key The single-use key to encode with
     * @returns {object|string} The encoded message
     */
    decode(message, key) {
        let output = '';
        for (let i = 0; i < key.length; i++) {
            const letterIndex = this.characters.indexOf(message[i]);
            const keyIndex = this.characters.indexOf(key[i]);
            this._checkIndex(letterIndex, keyIndex, i);
            const out = this._rollover(letterIndex - keyIndex);
            output += this.characters.charAt(out);
        }
        return output;
    }

    /**
     * Generate a key with a given length
     *
     * Security Tips:
     * Do not use the same key twice, ever!
     * Do not save the key once you have enciphered a message!
     * @param {number} length The length of the key
     * @returns {string} The random key
     */
    generateKey(length = 32) {
        return randomString(length, this.characters);
    }

    _checkIndex(letterIndex, keyIndex, index) {
        if (letterIndex < 0 || keyIndex < 0) {
            throw new Error("Could not find message or key letter in character set at index " + index);
        }
    }

    _rollover(index) {
        if (index < 0) {
            return index + this.characters.length;
        }
        if (index >= this.characters.length) {
            return index - this.characters.length;
        }
        return index;
    }

    /**
     * Get the character set to encode and decode with
     * @returns {string} The character set
     */
    static get DEFAULT_CHARACTERS() {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }

    /**
     * String Tag
     * @returns {string} The string tag
     */
    get [Symbol.toStringTag]() {
        return 'OneTimePad';
    }
};