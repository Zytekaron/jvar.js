const type = require('./type');

/**
 * Check if all input objects are of the same type
 * @type {(function(*=): *)|*} - The objects to compare
 * @return {boolean} - Whether or not all the input objects are of the same type
 * @example
 * sameType(1, 53, 7); // true
 * sameType([], [], {}); // false
 */
module.exports = (...objects) => {
    const checkType = type(objects[0]);
    for (const obj of objects) {
        if (type(obj) !== checkType) return false;
    }
    return true;
};