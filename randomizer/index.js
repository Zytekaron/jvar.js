const { ensure } = require('../utility');

/**
 * Randomizer using alias method
 * @param {object} options The options for this Randomizer
 * @param {boolean} options.secure Whether or not to use a crypto-powered randomization function (slower, more secure)
 * @example
 * const Randomizer = require('jvar/randomizer');
 * const randomizer = new Randomizer()
 *     // add elements one-by-one
 *     .add(1.6, 'Red')
 *     .add(4.4, 'Green')
 *     .add(14.0, 'Blue')
 *     // add elements from arrays (same values as shown above)
 *     .addArray([
 *         [1.6, 'Red'],
 *         [4.4, 'Green'],
 *         [14.0, 'Blue'],
 *     ])
 *     // add elements from objects (same values as shown above)
 *     .addObject([
 *         { weight: 1.6, value: 'Red' },
 *         { weight: 4.4, value: 'Green' },
 *         { weight: 14.0, value: 'Blue' },
 *     ])
 *     .prepare(); // makes the object immutable and enables sampling

 * const result1 = randomizer.sample(); // sample a value
 * const [result2, result3, result4] = randomizer.sample(3); // sample 3 values
 */
module.exports = class Randomizer {
    /**
     * Create a Randomizer instance
     * @param {boolean} [secure=false] Whether or not to use a crypto-based random number generator (slower, but more secure)
     */
    constructor(secure = false) {
        this.secure = secure;
        this.weights = [];
        this.results = [];
    }

    /**
     * Add elements to the Randomizer, one at a time
     * @param {number} weight The weight of this element
     * @param {*} [result=weights.length] The result when this element is sampled
     * @returns {Randomizer} The randomizer to continue adding to
     */
    add(weight, result = this.weights.length) {
        ensure.notNaN(weight);
        this.weights.push(weight);
        this.results.push(result);
        return this;
    }

    /**
     * Add elements to the Randomizer from an array of arrays
     * @param {[[number, *]]} arrays The array of arrays with elements to add
     * @returns {Randomizer} The randomizer to continue adding to
     */
    addArray(arrays) {
        for (const array of arrays) {
            this.add(array[0], array[1]);
        }
        return this;
    }

    /**
     * Add elements to the Randomizer from an array of objects
     * @param {[{ weight: number, value: *=weights.length }]} objects The array of objects with elements to add
     * @returns {Randomizer} The randomizer to continue adding to
     */
    addObject(objects) {
        for (let object of objects) {
            this.add(object.weight, object.value);
        }
        return this;
    }

    /**
     * Prepare the randomizer for sampling
     *
     * This method creates the alias method (which may take some time) and freezes this object.
     * To add, remove, or change elements, you must create a new Randomizer.
     * @returns {Readonly<Randomizer>}
     */
    prepare() {
        const sample = aliasMethod(this.weights, this.secure ? secureRandom : random);
        this._sample = () => this.results[sample()];
        return Object.freeze(this);
    }

    /**
     * Sample the alias method to get a random value, or random values, respecting the weights of each element
     * @param {number} [count=1] The number of elements to sample
     * @returns {*} The sampled element or elements
     */
    sample(count = 1) {
        ensure.integer(count);
        if (!Object.isFrozen(this)) {
            throw new Error("Randomizer 'prepare' method must be called before sampling may begin");
        }
        if (count === 1) {
            return this._sample();
        } else {
            return Array(count)
                .fill(0)
                .map(this._sample);
        }
    }
};

const { random, secureRandom } = require('../math');
function aliasMethod(probabilities, rand) {
    const sum = probabilities.reduce((acc, cur) => acc + cur, 0);

    const probMultiplier = probabilities.length / sum;
    probabilities = probabilities.map(p => p * probMultiplier);

    const overFull = [];
    const underFull = [];
    probabilities.forEach((p, i) => p > 1 ? overFull.push(i) : p < 1 ? underFull.push(i) : 0);

    const aliases = [];
    while (overFull.length + underFull.length > 0) {
        if (overFull.length > 0 && underFull.length > 0) {
            const firstOver = overFull[0];
            const firstUnder = underFull[0];

            probabilities[firstOver] += probabilities[firstUnder] - 1;
            aliases[firstUnder] = firstOver;
            underFull.shift();

            if (probabilities[firstOver] > 1) {
                overFull.push(overFull.shift());
            } else if (probabilities[firstOver] < 1) {
                underFull.push(overFull.shift());
            } else {
                overFull.shift();
            }
        } else {
            const nea = overFull.length > 0 ? overFull : underFull;
            nea.forEach(i => probabilities[i] = 1);
            nea.length = 0;
        }
    }

    /**
     * Sample this alias method to get a random index based on the input weights
     * @returns {integer} A random index, respecting the input weights
     */
    return () => {
        const index = Math.floor(rand(0, probabilities.length));
        return rand() < probabilities[index] ? index : aliases[index];
    }
}