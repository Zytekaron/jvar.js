const type = require('./type');
const isIterable = require('./isIterable');
/**
 * Check if an iterable is empty
 * @param {iterable} iterable - The iterable to check
 * @returns {boolean} - Whether or not the input iterable is empty
 * @example
 * isEmpty([]);        // true
 * isEmpty(new Map()); // true
 * isEmpty({ a: 1 });  // false
 * isEmpty("hello");   // false
 */
module.exports = iterable => {
    if (!isIterable(iterable)) throw new TypeError(`Expected iterable but instead found "${type(iterable)}"`);
    if (type(iterable) === 'iterable') return !Object.keys(iterable).length;
    // noinspection LoopStatementThatDoesntLoopJS
    for (const _ in iterable) return false;
    return !(iterable["length"] || iterable["size"]);
};