/**
 * Escape a string for usage in regular expressions
 * @param string - The string to perform the operation on
 * @returns {string} - The escaped string
 * @example
 * regexEscape("[Zytekaron] Hello there ^^ check out google.com :)");
 * // "\[Zytekaron\] Hello there \^\^ check out google\.com :\)"
 */
module.exports = string => string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');