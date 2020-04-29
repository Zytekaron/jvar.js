/**
 * Fuzzy search function.
 * @param {string} needle - The string to search for
 * @param {string} haystack - The string to search in
 * @return {boolean} - Whether or not the needle was found in the haystack
 * @example
 * fuzzy('NASA', 'National Aeronautics and Space Administration'); // => true
 * fuzzy('HelloWorld', 'Hello, World!'); // => true
 * fuzzy('HelloWorld', 'Hi, World!'); // => false
 */
module.exports = (needle, haystack) => {
    let nl = needle.length;
    let hl = haystack.length;

    if (nl > hl) return false;
    if (nl === hl) return needle === haystack;

    outer: for (let i = 0, j = 0; i < nl; i++) {
        let nch = needle.charCodeAt(i);
        while (j < hl) {
            if (haystack.charCodeAt(j++) === nch) continue outer;
        }
        return false;
    }
    return true;
};