const util = require('util');
const type = require('./type');
/**
 * Object inspector
 * @param {object} obj - The object to inspect
 * @returns {string} - The inspected value of the input
 * @example
 * inspect("hi");        // "hi"
 * inspect({a:{b:'2'}}); // "{ a: { b: '2' } }"
 * inspect([1,2,3]);     // "[ 1, 2, 3 ]"
 */
module.exports = obj => type(obj) === 'string' ? obj : util.inspect(obj);