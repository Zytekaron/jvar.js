/**
 * Array grouper -- creates smaller arrays with
 * @param {array} arr - The array to perform grouping on
 * @param {number} size - The size of the group
 * @param {boolean} obj - Return an object with grouped and ignored arrays?
 * @returns { array | { ignored: array, grouped: array } } - Grouped array / grouped and ignored array
 * @example
 * group([1, 2, 3, 4], 2); // [ [1, 2], [3, 4] ]
 * group([1, 2, 3, 4, 5], 2, true); // { grouped: [ [1, 2], [3, 4], ] ignored: [5] }
 */
module.exports = (arr = [], size, obj) => {
    let p = [], reverse = false;
    if (size < 1) [size, reverse] = [-size, 1];
    while (arr.length >= size) p.push(arr.splice(0, size));
    if (reverse) p = p.map(i => i.reverse()).reverse();
    if (obj) return { grouped: p, ignored: arr };
    return p;
};
