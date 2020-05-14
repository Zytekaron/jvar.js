const type = require('../fn/type');
const isIterable = require('../fn/isIterable');

module.exports = {
    /**
     * Check if the type of the given object matches one of the allowed types. Throws an error if not.
     * 'nil' may used in place of 'null', 'undefined'
     * Fails when all types have been checked
     * @param {*} obj The object to check the type of
     * @param {string|function} types The types that are allowed
     * @example
     * ensure.type(['input'], 'string', 'array'); // does nothing: ['input'] is an array
     * ensure.type('sbeve', Set); // throws an error: Expected "set" but instead found "string"
     * ensure.type(123, 'nil'); // throws an error: Expected one of "null, undefined" but instead found "number"
     */
    type(obj, ...types) {
        if (types.includes('nil')) {
            types.splice(types.indexOf('nil'), 1);
            types.push('null', 'undefined');
        }
        for (const t of types) {
            if (type(obj) === t.toLowerCase()) return;
            if (typeof t === 'function' && obj instanceof t) return;
        }
        if (types.length > 1) {
            throw new TypeError(`Expected one of "${types.join('", "')}" but instead found "${type(obj)}"`);
        } else {
            throw new TypeError(`Expected "${types[0]}" but instead found "${type(obj)}"`);
        }
    },

    /**
     * Ensure that every object is defined (not null or undefined)
     * Fails on first non-match
     * @param {*} data The data to ensure is defined
     * @example
     * ensure.defined(123, []); // does nothing
     * ensure.defined(new Set(), null); // throws an error: Expected value but instead found "null"
     */
    defined(...data) {
        for (const obj of data) {
            if (obj == null) {
                throw new TypeError(`Expected value but instead found "${type(obj)}"`);
            }
        }
    },

    /**
     * Ensure that every object is not NaN (is a valid number)
     * Fails on first non-match
     * @param {object} data The data to ensure is not NaN
     * @example
     * ensure.notNaN(123, 456); // does nothing
     * ensure.notNaN([]); // throws an error: Expected number but instead found "array"
     * ensure.notNaN(null); // throws an error: Expected number but instead found "null"
     */
    notNaN(...data) {
        for (const obj of data) {
            if (!(obj instanceof Number) || isNaN(obj)) {
                throw new TypeError(`Expected number but instead found "${type(obj)}"`);
            }
        }
    },

    /**
     * Ensure the input is an integer (no decimals)
     * Fails on first non-match
     * @param {number} data - The number to check
     * @example
     * ensure.integer(5); // does nothing
     * ensure.integer([]); // throws an error: Expected integer but instead found "array"
     * ensure.integer(6.3); // throws an error: Expected integer but instead found floating-point number
     */
    integer(...data) {
        for (const obj of data) {
            if (isNaN(obj)) {
                throw new TypeError(`Expected integer but instead found "${type(obj)}`);
            }
            if (!Number.isInteger(obj)) {
                throw new TypeError("Expected integer but instead found floating-point number");
            }
        }
    },

    /**
     * Ensure that all the objects are iterable
     * Fails on first non-match
     * @param {*} data The data to ensure is defined
     * @example
     * ensure.iterable([], {}); // does nothing: all objects are iterable
     * ensure.iterable(12, /a/); // throws an error: Expected iterable, instead found "number"
     */
    iterable(...data) {
        for (const obj of data) {
            if (!isIterable(obj)) {
                throw new Error(`Expected iterable, instead found: "${type(obj)}"`);
            }
        }
    }
};