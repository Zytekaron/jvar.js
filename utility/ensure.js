const type = require('../fn/type');
const isIterable = require('../fn/isIterable');

module.exports = {
    /**
     * Ensure the input is an integer (no decimals)
     * @param {number} int - The number to check
     */
    integer(int) {
        if (!Number.isInteger(int)) {
            throw new TypeError("Expected integer but instead found floating-point number");
        }
    },

    type(obj, ...types) {
        if (types.includes('nil')) {
            types.splice(types.indexOf('nil'), 1);
            types.push('null');
            types.push('undefined');
        }
        for (const t of types) {
            if (type(obj) === t.toLowerCase() || obj instanceof t) return;
        }
        if (types.length > 1) {
            throw new TypeError(`Expected one of "${types.join('", "')}" but instead found "${type(obj)}"`);
        }
    },

    defined(...data) {
        for (const obj of data) {
            if (obj == null) throw new TypeError(`Expected value but instead found "${type(obj)}"`);
        }
    },

    notNaN(...data) {
        for (const obj of data) {
            if (isNaN(obj)) throw new TypeError(`Expected number but instead found "NaN"`);
        }
    },

    iterable(...data) {
        for (const obj of data) {
            if (!isIterable(obj)) {
                throw new Error(`Expected iterable, instead found: "${type(obj)}"`);
            }
        }
    }
};
