/**
 * jvar module
 * @module jvar
 */

/**
 * index module
 * @type {{ Enum: module, Cherry: module, BitSet: module, fn: module, utility: module, math: module }}
 * @exports module:jvar/math
 */
module.exports = {
    BitSet: require('./bitset'),
    Cherry: require('./cherry'),
    Enum: require('./enum'),
    fn: require('./fn'),
    math: require('./math'),
    utility: require('./utility')
};