const type = require('../fn/type');

/**
 * Enum - Enums in JavaScript
 * @class Enum
 */
module.exports = class Enum {
    /**
     * Constructor
     * @param {iterable} iterable - The object to create an Enum from
     * @param {function|null} fn - The function to call on the value (ie Symbol)
     */
    constructor(iterable, fn) {
        if (type(iterable) === 'object') iterable = Object.entries(iterable);
        for (const object of iterable) {
            let key, value;
            if (type(object) === 'string') [key, value] = [object, fn ? fn(object) : object];
            if (type(object) === 'array') [key, value] = [object[0], fn ? fn(object[1]) : object[1]];
            if (type(this[key]) !== 'undefined') throw new Error("Duplicate enum value '" + key + "'");
            this[key] = value;
        }
        Object.freeze(this);
    }

    /**
     * Get the value of a string in this Enum (identical to MyEnum[identifier])
     * @param {string} identifier - The identifier of the key you want to get
     * @returns {*} - The value of this identifier
     */
    get(identifier) {
        return this[identifier];
    }

    /**
     * Check if a key exists in this Enum
     * @param {string} identifier - The identifier of the key you want to check
     * @returns {boolean} - Whether or not this identifier exists in the enum
     */
    has(identifier) {
        return this[identifier] !== undefined;
    }

    /**
     * Get a list of elements in this Enum
     * @param {string|null} [delimiter:','] - The string to join elements by
     * @returns {string|array} - The elements in this enum. If a delimiter is given, the elements are joined by a string, otherwise an array is returned
     */
    list(delimiter = null) {
        const items = Object.keys(this);
        return delimiter ? items.join(delimiter) : items;
    }

    /**
     * Get the size of this Enum
     * @returns {number} size - The size of this Enum
     */
    get size() {
        return this.list().length;
    }
};