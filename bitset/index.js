/**
 * BitSet - A class to simplify bitwise operations on a single binary string
 * @class
 * @type {BitSet}
 */
module.exports = class BitSet {
    /**
     * BitSet constructor
     * @param {number} bits - The initial bits to use
     * @default 0
     */
    constructor(bits = 0) {
        /**
         * The bits in this BitSet
         * @type {number}
         * @private
         */
        this._bits = bits;
    }

    /**
     * Test the BitSet against bits or another BitSet
     * @param {BitSet|number} other - The bits/BitSet to compare with
     * @default 0b0
     * @returns {boolean} - Whether or not the bits are the same
     */
    test(other = 0b0) {
        if(other instanceof BitSet) other = other._bits;
        return (this._bits & other) === other;
    }

    /**
     * AND Binary Operation
     * @param {BitSet|number} other - The bits/BitSet to AND
     * @default 0b0
     * @returns {number} - The result of the operation
     */
    and(other = 0b0) {
        if(other instanceof BitSet) other = other._bits;
        return this._bits &= other;
    }

    /**
     * OR Binary Operation
     * @param {BitSet|number} other - The bits/BitSet to OR
     * @default 0b0
     * @returns {number} - The result of the operation
     */
    or(other = 0b0) {
        if(other instanceof BitSet) other = other._bits;
        return this._bits |= other;
    }

    /**
     * XOR Binary Operation
     * @param {BitSet|number} other - The bits/BitSet to XOR
     * @default 0b0
     * @returns {number} - The result of the operation
     */
    xor(other = 0b0) {
        if(other instanceof BitSet) other = other._bits;
        return this._bits ^= other;
    }

    /**
     * NOT Binary Operation
     * @returns {number} - The result of the operation
     */
    not() {
        this._bits = ~this._bits;
    }

    /**
     * Set a bit
     * @param {number} position - The position of the bit to set
     * @returns {BitSet} - The resulting BitSet
     */
    set(position) {
        const mask = (1 << position);
        this._bits |= mask;
        return this;
    }

    /**
     * Set multiple bits
     * @param {number} start - The index from which to start setting
     * @default 0
     * @param {number} count - The number of bits in a row to set
     * @default 1
     * @returns {BitSet} - The resulting BitSet
     */
    setMany(start = 0, count = this._bits.toString(2).length) {
        for(let i = start; i < count + start; i++) this._bits |= (1 << i);
        return this;
    }

    /**
     * Clear a bit
     * @param {number} position - THe position of the bit to clear
     * @returns {BitSet} - The resulting BitSet
     */
    clear(position) {
        const mask = (1 << position);
        this._bits &= ~mask;
        return this;
    }

    /**
     * Clear multiple bits
     * @param {number} start - The index from which to start clearing
     * @default 0
     * @param{number} number - The number of bits in a row to clear
     * @default 1
     * @returns {BitSet}
     */
    clearMany(start = 0, number = 1) {
        for(let i = start; i < number + start; i++) this._bits &= ~(1 << i);
        return this;
    }

    /**
     * Clear the entire BitSet
     * @returns {BitSet}
     */
    clearAll() {
        this._bits = 0b0;
        return this;
    }

    /**
     * Toggle the bit
     * @param {number} position - The position at which to toggle the bit
     * @returns {BitSet} - The resulting BitSet
     */
    toggle(position) {
        const mask = (1 << position);
        this.bits ^= mask;
        return this;
    }

    /**
     * Toggle multiple bits
     * @param {number} start - The index from which to start toggling
     * @default 0
     * @param {number} number - The number of bits in a row to toggle
     * @default 1
     * @returns {BitSet} - The resulting BitSet
     */
    toggleMany(start = 0, number = 1) {
        for(let i = start; i < number + start; i++) this._bits ^= (1 << i);
        return this;
    }

    /**
     * Clone this BitSet
     * @returns {BitSet} - The new cloned BitSet
     */
    clone() {
        return new BitSet(this._bits);
    }

    /**
     * Get the bits in this BitSet
     * @returns {number}
     */
    get bits() {
        return this._bits;
    }

    /**
     * Get the bits in this BitSet
     * @returns {number}
     */
    get number() {
        return this._bits;
    }

    /**
     * Get the bits in this BitSet as a binary string
     * @returns {string}
     */
    get string() {
        return this._bits.toString(2);
    }

    /**
     * Set the bits in this BitSet
     * @param {number}  bits - The bits to put in this BitSet
     */
    set bits(bits) {
        this._bits = bits;
    }
};