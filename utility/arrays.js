const { random, secureRandom } = require('../math');
const { get: _get } = require('lodash');

module.exports = {
    /**
     * Sort in ascending order
     * Each provided path is used to sort the array
     * @param {[string]} paths The paths to sort by
     * @returns {function(...[*]=)}
     */
    ascending(...paths) {
        return (a, b) => {
            for (const path of paths) {
                let A = getValue(a, path);
                let B = getValue(b, path);
                if (B - A !== 0) return B - A;
            }
            return 0;
        }
    },

    /**
     * Sort in descending order
     * Each provided path is used to sort the array
     * @param {[string]} paths The paths to sort by
     * @returns {function(...[*]=)}
     */
    descending(...paths) {
        return (a, b) => {
            for (const path of paths) {
                let A = getValue(a, path);
                let B = getValue(b, path);
                if (A - B !== 0) return A - B;
            }
            return 0;
        }
    },

    /**
     * Filter by truthy values
     * @param {string} path The path in which to check the value
     * @returns {function(*=): boolean}
     */
    truthy(path) { // !! not necessary
        return (e) => !!getValue(e, path);
    },

    /**
     * Filter by true values
     * @param {string} path The path in which to check the value
     * @returns {function(*=): boolean}
     */
    true(path) {
        return (e) => getValue(e, path) === true;
    },

    /**
     * Filter by falsy values
     * @param {string} path The path in which to check the value
     * @returns {function(*=): boolean}
     */
    falsy(path) {
        return (e) => !getValue(e, path);
    },

    /**
     * Filter by false values
     * @param {string} path The path in which to check the value
     * @returns {function(*=): boolean}
     */
    false(path) {
        return (e) => getValue(e, path) === false;
    },

    /**
     * Filter by non-null values
     * @param {string} path The path in which to check the value
     * @returns {function(*=): boolean}
     */
    notNull(path) { // null, undefined
        return (e) => getValue(e, path) != null;
    },

    /**
     * Filter by defined values
     * @param {string} path The path in which to check the value
     * @returns {function(*=): boolean}
     */
    notUndefined(path) { // undefined, NOT null
        return (e) => getValue(e, path) !== undefined;
    },

    /**
     * Randomize this array
     * @returns {function(): number}
     */
    random() {
        return () => .5 - random();
    },

    /**
     * Randomize this array in a cryptographically secure fashion
     * @returns {function(): number}
     */
    secureRandom() {
        return () => .5 - secureRandom();
    },

    /**
     * Search for a value within this array by its path and value
     * @param {string} path The path in which to compare the value from each element
     * @param {*} value The value to compare with the one at the provided path
     * @returns {function(*=): boolean}
     */
    equals(path, value) {
        return (e) => getValue(e, path) === value;
    },

    /**
     * Search for an array within this array that includes a specified value
     * @param {string} path The path to an array within each element
     * @param {*} value The value to compare with those within the array at the provided path
     * @returns {function(...[*]=)}
     */
    includes(path, value) {
        return (e) => {
            const arr = getValue(e, path);
            if (type(arr) === 'array') {
                return arr.includes(value);
            }
        }
    },

    /**
     * Search for an array within this array that does not include a specified value
     * @param {string} path The path to an array within each element
     * @param {*} value The value to compare with those within the array at the provided path
     * @returns {function(...[*]=)}
     */
    notIncludes(path, value) {
        return (e) => {
            const arr = getValue(e, path);
            if (type(arr) === 'array') {
                return !arr.includes(value);
            }
        }
    }
};

function getValue(obj, path) {
    return path ? _get(obj, path) : obj;
}