/**
 * jvar module
 * @module jvar
 */

module.exports = {
    BitSet: require('./bitset'),
    Cherry: require('./cherry'),
    Enum: require('./enum'),
    fn: require('./fn'),
    math: require('./math'),
    OneTimePad: require('./otp'),
    Randomizer: require('./randomizer'),
    utility: require('./utility'),

    identity: (value) => value,
    nil: () => null,
    version: '1.3.0'
};