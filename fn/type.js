/**
 * A function to replace the typeof operator
 * @param object - The object to check the type of
 * @returns {string} - The type of the object
 * @example
 * type("HELLO!!!"); // 'string'
 * type([ 69 ]);     // 'array'
 * type(new Date()); // 'date'
 */
module.exports = object => ({}).toString.call(object).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();