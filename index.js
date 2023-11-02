/**
 * jvar module
 * @module jvar
 */

module.exports = {
    fn: require('./fn'),
    identity: (value) => value,
    math: require('./math'),
    nil: () => null,
    noop: () => null,
    utility: require('./utility'),
    version: '1.5.3',

    BitSet: require('./bitset'),
    Cherry: require('./cherry'),
    Enum: require('./enum'),
    Lex: require('./lex'),
    OneTimePad: require('./otp'),
    Randomizer: require('./randomizer'),
};
