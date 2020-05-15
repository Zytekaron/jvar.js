const ensure = require("../utility/ensure");

const type = require('../fn/type');
const constrain = require('../fn/constrain');
const randomInt = require('../math/randomInt');

const {
    get: _get,
    set: _set,
    unset: _unset
} = require('lodash');

const math = {
    add: ['+', 'a', 'sum', 'addition'],
    sub: ['-', 's', '–', '—', 'subtract', 'minus', 'subtraction'],
    mul: ['*', 'x', '×', 'product', 'mlt', 'mult', 'multiply', 'multiplication', 'times'],
    div: ['/', 'd', '÷', 'divide', 'division'],
    mod: ['%', 'm', 'modulo', 'modulus'],
    pow: ['^', 'p', '**', 'power', 'exp', 'exponent', 'exponentiation']
};

function doMath(target, operation, operand) {
    switch (operation) {
        case 'add': return target + operand;
        case 'sub': return target - operand;
        case 'mul': return target * operand;
        case 'div': return target / operand;
        case 'mod': return target % operand;
        case 'pow': return target ** operand;
        default: throw new Error(`Invalid mathematical operation "${operation}"`);
    }
}

/**
 * Cherry - Object Utility
 * @class Cherry
 * @extends Object
 */
module.exports = class Cherry extends Object {
    /**
     * Constructor
     * @param {iterable|object} iterable
     */
    constructor(iterable = {}) {
        if (type(iterable) === 'object') iterable = Object.entries(iterable);
        super(iterable);
    }

    /**
     * Do something for each key/value pair in this Cherry
     * @param {function} fn - The function to call with each pair
     * @param {object} [thisArg] - The value to assign to the callback function's `this`
     * @returns {Cherry} - The unmodified Cherry
     */
    each(fn, thisArg) {
        if (thisArg) fn = fn.bind(thisArg);
        for (const [key, value] of Object.entries(this)) {
            fn(value, key, this);
        }
        return this;
    }

    /**
     * Modify each key/value pair in this Cherry
     * @param {function} fn - The function to call with each pair
     * @param {object} [thisArg] - The value to assign to the callback function's `this`
     * @returns {Cherry} - The modified Cherry
     */
    apply(fn, thisArg) {
        if (thisArg) fn = fn.bind(thisArg);
        for (const [key, value] of Object.entries(this)) {
            this[key] = fn(value, key, this);
        }
        return this;
    }

    /**
     * Map the data within this Cherry to an array using a mapper callback
     * @param {function} fn - The function to call with each pair
     * @param {object} [thisArg] - The value to assign to the callback function's `this`
     * @returns {array} - The mapped values
     */
    map(fn, thisArg) {
        if (thisArg) fn = fn.bind(thisArg);
        const data = [];
        for (const [key, value] of Object.entries(this)) {
            data.push(fn(value, key, this));
        }
        return data;
    }

    /**
     * Get a value from this Cherry
     * @param {string} path - The path at which to get the value
     */
    get(path) {
        ensure.type(path, 'string');
        return _get(this, path);
    }

    /**
     * Set a key to a value in this Cherry
     * @param {string} path - The path to assign this value in
     * @param {string} value - The value of the given key
     * @returns {Cherry} - The modified Cherry
     */
    set(path, value) {
        ensure.type(path, 'string');
        ensure.defined(value);
        _set(this, path, value);
        return this;
    }

    /**
     * Delete a key from this Cherry
     * @param {string} path - The path to delete
     * @returns {*} - The value of the deleted key
     */
    delete(path) {
        ensure.type(path, 'string');
        const data = _get(this, path);
        _unset(this, path);
        return data;
    }

    /**
     * Push an element into a nested Array
     * @param {string} path - The path to the Array to push into
     * @param {*} value - The value to push into the Array
     * @returns {*} - The Array with the added element
     */
    pushIn(path, value) {
        ensure.type(path, 'string');
        ensure.defined(value);
        const data = _get(this, path);
        ensure.type(data, 'array');
        data.push(value);
        _set(this, path, data);
        return data;
    }

    /**
     * Add an element into a nested Set
     * @param {string} path - The path to the Set to push into
     * @param {*} value - The value to push into the Set
     * @returns {*} - The Set with the added element
     */
    addIn(path, value) {
        ensure.type(path, 'string');
        ensure.defined(value);
        const data = _get(this, path);
        ensure.type(data, 'set');
        data.add(value);
        _set(this, path, data);
        return data;
    }

    /**
     * Put a key/value pair into a nested Map
     * @param {string} path - The path to the Map to put into
     * @param {*} key - The key of the element to put into the Map
     * @param {*} value - The value of the element to put into the Map
     * @returns {*} - The Map with the added key/value pair
     */
    setIn(path, key, value) {
        ensure.type(path, 'string');
        ensure.defined(key, value);
        const data = _get(this, path);
        ensure.type(data, 'map');
        data.set(key, value);
        _set(this, path, data);
        return data;
    }

    /**
     * Check if a key has a value in this Cherry
     * @param {string} path - The path to check for a value
     * @returns {boolean} - Whether or not there is a value at the given path
     */
    has(path) {
        ensure.type(path, 'string');
        return _get(this, path) !== undefined;
    }

    /**
     * Find a value based on the first item where the return value is true
     * @param {function} fn - The function to call with each pair
     * @param {object} [thisArg] - The value to assign to the callback function's `this`
     * @returns {null|any} - The result, if any
     */
    find(fn, thisArg) {
        if (thisArg) fn = fn.bind(thisArg);
        for (const [key, value] of Object.entries(this)) {
            if (fn(value, key, this)) return value;
        }
        return null;
    }

    /**
     * Filter the cherry, returning a Cherry with all values which pass the callback function
     * @param {function} fn - The function to call with each pair
     * @param {object} [thisArg] - The value to assign to the callback function's `this`
     * @returns {Cherry} - The resulting Cherry of passing values
     */
    filter(fn, thisArg) {
        if (thisArg) fn = fn.bind(thisArg);
        const cherry = new Cherry();
        for (const [key, value] of Object.entries(this)) {
            if (fn(value, key, this)) cherry.set(key, value);
        }
        return cherry;
    }

    /**
     * Filter the cherry, returning a Cherry with all values which fail the callback function
     * @param {function} fn - The function to call with each pair
     * @param {object} [thisArg] - The value to assign to the callback function's `this`
     * @returns {Cherry} - The resulting Cherry of failing values
     */
    sweep(fn, thisArg) {
        if (thisArg) fn = fn.bind(thisArg);
        const data = Object.assign(new Cherry(), this);
        for (const [key, value] of Object.entries(this)) {
            if (fn(value, key, this)) _unset(data, key);
        }
        return data;
    }

    /**
     * Check if every key/value pair passes the callback function
     * @param {function} fn - The function to call with each pair
     * @param {object} [thisArg] - The value to assign to the callback function's `this`
     * @returns {boolean} - Whether or not all the pairs passed the callback function
     */
    every(fn, thisArg) {
        if (thisArg) fn = fn.bind(thisArg);
        for (const [key, value] of Object.entries(this)) {
            if (!fn(value, key, this)) return false;
        }
        return true;
    }

    /**
     * Check if any key/value pair passes the callback function
     * @param {function} fn - The function to call with each pair
     * @param {object} [thisArg] - The value to assign to the callback function's `this`
     * @returns {boolean} - Whether or not any of the pairs passed the callback function
     */
    some(fn, thisArg) {
        if (thisArg) fn = fn.bind(thisArg);
        for (const [key, value] of Object.entries(this)) {
            if (fn(value, key, this)) return true;
        }
        return false;
    }


    /**
     * Ensure that a property exists in the Cherry (if not, set it to a given default value)
     * @param {string} path - The path to ensure a pair at
     * @param {*} value - The default value for the pair at the given path
     * @returns {*} - The data at the given path after being ensured
     */
    ensure(path, value) {
        ensure.type(path, 'string');
        ensure.defined(value);
        const data = _get(this, path);
        if (data === undefined) _set(this, path, value);
        return data;
    };

    /**
     * Convert this Cherry to a Map
     * @returns {map}
     */
    toMap() {
        return new Map(this);
    }

    /**
     * Convert this Cherry to an Array
     * @returns {array}
     */
    array() {
        return this.entryArray();
    }

    /**
     * Get a Set of all the entries in this Cherry
     * @returns {set}
     */
    toSet() {
        return new Set(Object.entries(this));
    }

    /**
     * Get an Array of all the entries in this Cherry
     * @returns {array}
     */
    entryArray() {
        return Array.from(Object.entries(this));
    }

    /**
     * Get a Set of all the entries in this Cherry
     * @returns {set}
     */
    entrySet() {
        return new Set(Object.entries(this));
    }

    /**
     * Get an Array of all the keys in this Cherry
     * @returns {array}
     */
    keyArray() {
        return Array.from(Object.keys(this));
    }

    /**
     * Get a Set of all the keys in this Cherry
     * @returns {set}
     */
    keySet() {
        return new Set(Object.keys(this));
    }

    /**
     * Get an Array of all the values in this Cherry
     * @returns {array}
     */
    valueArray() {
        return Array.from(Object.values(this));
    }

    /**
     * Get a Set of all the values in this Cherry
     * @returns {set}
     */
    valueSet() {
        return new Set(Object.values(this));
    }

    /**
     * Get the first entry/entries in this Cherry
     * @param {number} [count=1] - The number of entries to get
     * @param {boolean} [keepArray=false] - Whether or not to return an array when 1 value is collected
     * @returns {array | array<array>} - The first entry/entries in this Cherry
     */
    first(count = 1, keepArray = false) {
        ensure.integer(count);
        const data = this.entryArray();
        if (!data.length) return null;
        if (!keepArray && count === 1) return data.next().value;
        count = constrain(count, 1, data.length);
        return Array.from(data).slice(0, count);
    }

    /**
     * Get the first key/keys in this Cherry
     * @param {number} [count=1] - The number of keys to get
     * @param {boolean} [keepArray=false] - Whether or not to return an array when 1 value is collected
     * @returns {string | array<string>} - The first key/keys in this Cherry
     */
    firstKey(count = 1, keepArray = false) {
        const data = this.first(count);
        if (!keepArray && count === 1) {
            return data;
        } else {
            return data.map(i => i[0]);
        }
    }

    /**
     * Get the first value/values in this Cherry
     * @param {number} [count=1] - The number of values to get
     * @param {* | array<*>} [keepArray=false] - The first value/values in this Cherry
     * @returns {string | array<string>} - The first value/values in this Cherry
     */
    firstValue(count = 1, keepArray = false) {
        const data = this.first(count);
        if (!keepArray && count === 1) {
            return data;
        } else {
            return data.map(i => i[1]);
        }
    }

    /**
     * Get the last entry/entries in this Cherry
     * @param {number} [count=1] - The number of entries to get
     * @param {boolean} [keepArray=false] - Whether or not to return an array when 1 value is collected
     * @returns {array | array<array>} - The last entry/entries in this Cherry
     */
    last(count = 1, keepArray = false) {
        ensure.integer(count);
        const data = this.entryArray();
        if (!keepArray && count === 1) return data[data.length - 1];
        count = constrain(count, 1, data.length);
        return data.slice(-count);
    }

    /**
     * Get the last key/keys in this Cherry
     * @param {number} [count=1] - The number of keys to get
     * @param {boolean} [keepArray=false] - Whether or not to return an array when 1 value is collected
     * @returns {string | array<string>} - The last key/keys in this Cherry
     */
    lastKey(count = 1, keepArray = false) {
        const data = this.last(count);
        if (!keepArray && count === 1) {
            return data;
        } else {
            return data.map(i => i[0]);
        }
    }

    /**
     * Get the last value/values in this Cherry
     * @param {number} [count=1] - The number of values to get
     * @param {* | array<*>} [keepArray=false] - The last value/values in this Cherry
     * @returns {string | array<string>} - The last value/values in this Cherry
     */
    lastValue(count = 1, keepArray = false) {
        const data = this.last(count);
        if (!keepArray && count === 1) {
            return data;
        } else {
            return data.map(i => i[1]);
        }
    }

    /**
     * Get a random entry/random entries in this Cherry
     * @param {number} [count=1] - The number of entries to get
     * @param {boolean} [keepArray=false] - Whether or not to return an array when 1 value is collected
     * @returns {array | array<array>} - The random entry/entries from this Cherry
     */
    random(count = 1, keepArray = false) {
        ensure.integer(count);
        const data = this.entryArray().slice();
        if (!data.length) return null;
        if (!keepArray && count === 1) return data[randomInt(data.length)];
        count = constrain(count, 1, data.length);
        const random = [];
        for (let i = 0; i < count; i++) {
            random.push(data.splice(randomInt(data.length), 1)[0]);
        }
        return random;
    }

    /**
     * Get a random key/random keys in this Cherry
     * @param {number} [count] - The number of entries to get
     * @param {boolean} [keepArray] - Whether or not to return an array when 1 value is collected
     * @returns {array | array<array>} - The random key/keys from this Cherry
     */
    randomKey(count = 1, keepArray = false) {
        const data = this.random(count);
        if (!keepArray && count === 1) {
            return data;
        } else {
            return data.map(i => i[0]);
        }
    }

    /**
     * Get a random value/random values entries in this Cherry
     * @param {number} [count] - The number of entries to get
     * @param {boolean} [keepArray] - Whether or not to return an array when 1 value is collected
     * @returns {array | array<array>} - The random value/values from this Cherry
     */
    randomValue(count = 1, keepArray = false) {
        const data = this.random(count);
        if (!keepArray && count === 1) {
            return data;
        } else {
            return data.map(i => i[1]);
        }
    }

    /**
     * Perform math on a value
     * @param {string} path - The path of the value to perform math on
     * @param {string} operation - The operation to perform on the number
     * @param {number} operand - The other operand for the given operation
     */
    math(path, operation, operand) {
        ensure.type(path, 'string');
        ensure.type(operation, 'string');
        ensure.notNaN(operand);
        for (const [key, value] of Object.entries(math)) {
            if (value.includes(operation)) {
                operation = key;
                break;
            }
        }
        const data = _get(this, path);
        if (isNaN(data)) throw new TypeError("The value at the provided path is not a number");
        const result = doMath(data, operation, operand);
        _set(this, path, result);
        return result;
    }

    /**
     * Increment a value
     * @param {string} path - The path at which to increment the value
     */
    inc(path) {
        return this.add(path, 1);
    }

    /**
     * Decrement a value
     * @param {string} path - The path at which to decrement the value
     */
    dec(path) {
        return this.sub(path, 1);
    }

    /**
     * Add to a value
     * @param {string} path - The path at which to add
     * @param {number} operand - The amount to add to the value at the given path
     */
    add(path, operand) {
        return this.math(path, 'add', operand);
    }

    /**
     * Subtract from a value
     * @param {string} path - The path at which to subtract
     * @param {number} operand - The amount to subtract from the value at the given path
     */
    sub(path, operand) {
        return this.math(path, 'sub', operand);
    }

    /**
     * Multiply a value
     * @param {string} path - The path at which to multiply
     * @param {number} operand - The amount to multiply the value at the given path by
     */
    mul(path, operand) {
        return this.math(path, 'mul', operand);
    }

    /**
     * Divide from a value
     * @param {string} path - The path at which to divide
     * @param {number} operand - The amount to divide the value at the given path by
     */
    div(path, operand) {
        return this.math(path, 'div', operand);
    }

    /**
     * Mod a value
     * @param {string} path - The path at which to mod
     * @param {number} operand - The amount to mod the value at the given path by
     */
    mod(path, operand) {
        return this.math(path, 'mod', operand);
    }

    /**
     * Apply an exponent to a value
     * @param {string} path - The path at which to apply the exponent
     * @param {number} operand - The exponent to apply to the value at the given path
     */
    pow(path, operand) {
        return this.math(path, 'pow', operand);
    }

    /**
     * String Tag
     * @returns {string} The string tag
     */
    get [Symbol.toStringTag]() {
        return 'Cherry';
    }

    /**
     * Iterator
     * @returns {iterator} A [key, value] iterator
     */
    [Symbol.iterator]() {
        const entries = Object.entries(this);
        return {
            next() {
                if (entries.length) {
                    return { value: entries.shift(), done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};