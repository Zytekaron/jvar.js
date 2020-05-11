/**
 * Add percentages to arrays based on weights inside them
 * @param {array} arr - Array of inputs
 * @param {boolean} int - Return a percentage number (true) or decimal (false/omit)?
 * @param {string} key - Input key name for weights
 * @param {string} value - Output key name for percentages
 * @returns {array} - Input array with percentages added
 * @example
 * percent([
 *     { id: 1, weightIn: 20 }
 *     { id: 1, weightIn: 25 }
 *     { id: 1, weightIn: 5 }
 * ], { int: true, key: "weightIn", value: "percentOut", });
 * // [
 *     { id: 1, weightIn: 20, percentOut: 40 }
 *     { id: 1, weightIn: 25, percentOut: 50 }
 *     { id: 1, weightIn: 5,  percentOut: 10 }
 * // ]
 */
module.exports = (arr, {
    int = false,
    key = "weight",
    value = "percentage"
} = {}) => {
    const t = arr
        .map(i => i[key])
        .reduce((a, c) => a + +c, 0);
    return arr.map(i => {
        i[value] = int ? i[key] / t * 100 : i[key] / t;
        return i;
    });
};