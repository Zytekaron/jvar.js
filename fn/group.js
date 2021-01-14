/**
 * Array grouper -- creates smaller array groups of the specified size from the source array
 *
 * The last group is not guaranteed to be the size of the others depending on the input.
 * Be sure to check this yourself by accessing it or ensuring `arr.length % size === 0`
 * @param {array} arr - The array to perform grouping on
 * @param {number} size - The size of each group
 * @returns {array} - An array of array groups
 * @example
 * group([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
 * group([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 */
module.exports = (arr, size) => {
    const grouped = [];
    for (let i = 0; i < arr.length; i += size) {
        grouped.push(arr.slice(i, i + size));
    }
    return grouped;
};
