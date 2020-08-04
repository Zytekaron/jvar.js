/**
 * Escape a string for usage in regular expressions
 * @param str {string} - The string to perform the operation on
 * @returns {string} - The escaped string
 * @example
 * regexEscape("[Zytekaron] Hello there ^^ check out google.com :)");
 * // "\[Zytekaron\] Hello there \^\^ check out google\.com :\)"
 */
module.exports = str => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
