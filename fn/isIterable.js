const type = require('./type');
/**
 * Check if an object is iterable
 * @param {object} object - The object to check
 * @returns {boolean} - Whether or not the input is an iterable
 * @example
 * isIterable("Hey!"); // true
 * isIterable({});     // true - note: special case!
 * isIterable(27);     // false
 */
module.exports = object => Symbol.iterator in Object(object) || type(object) === 'object';