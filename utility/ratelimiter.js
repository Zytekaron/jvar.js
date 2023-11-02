const ensure = require('./ensure');

const _version = Symbol('_version');
const _getOrCreate = Symbol('_getOrCreate');

const _ensure = Symbol('_ensure');

class Bucket {
    constructor(bucketManager, snowflake) {
        /**
         * The parent BucketManager
         * @type {BucketManager}
         */
        this.bucketManager = bucketManager;
        /**
         * The snowflake of this bucket
         * @type {*}
         */
        this.snowflake = snowflake;
        this.uses = 0;
        this.nextReset = 0;
    }

    /**
     * Check if this bucket can be drawn a specified amount of times
     * @param {number} [amount=1] The number of draws to check
     * @returns {boolean} Whether or not it can draw
     */
    canDraw(amount = 1) {
        ensure.integer(amount);
        this[_ensure]();
        return this.remainingUses >= amount;
    }

    /**
     * Draw from this bucket if possible
     * @param {number} [amount=1] The number of times to draw from the bucket
     * @returns {boolean} Whether or not the amount was able to be drawn from the bucket
     */
    draw(amount = 1) {
        ensure.integer(amount);
        this[_ensure]();
        if (this.canDraw(amount)) {
            this.uses += amount;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Draw from this bucket as many times as possible
     * Stops when the remaining uses reaches zero
     * @param {number} [amount=1] The number of times to draw from the bucket
     * @returns {number} The amount that was able to be drawn from the bucket (n <= amount)
     */
    drawMax(amount = 1) {
        ensure.integer(amount);
        this[_ensure]();
        const max = Math.min(amount, this.remainingUses);
        this.uses += max;
        return max;
    }

    /**
     * Forcefully draw from this bucket
     * @param {number} [amount=1] The number of times to draw from the bucket
     * @returns {number} The number of remaining uses. May be negative.
     */
    drawForce(amount = 1) {
        ensure.integer(amount);
        this[_ensure]();
        this.uses += amount;
        return this.remainingUses;
    }

    /**
     * Reset this bucket's usage count and reset time
     * @returns {void}
     */
    reset() {
        this.uses = 0;
        this.nextReset = Date.now() + this.bucketManager.reset;
    }

    /**
     * Get the remaining number of allowed uses before next reset
     * @returns {number} The remaining number of uses
     */
    get remainingUses() {
        return this.bucketManager.limit - this.uses;
    }

    /**
     * Get the remaining time until the next reset, in milliseconds
     * @returns {number} The time until the next reset
     */
    get remainingTime() {
        return Math.max(0, this.nextReset - Date.now());
    }

    [_ensure]() {
        if (this.remainingTime === 0) {
            this.reset();
        }
    }
}

class BucketManager {
    /**
     * Create a BucketManager
     * @param {number} limit The default limit for usage during the given reset interval
     * @param {number} reset The number of milliseconds until the next reset
     */
    constructor(limit, reset) {
        ensure.integer(limit, reset);
        /**
         * A Map of Buckets for each user
         * @type Map<*, Bucket>
         */
        this.buckets = new Map();
        this.limit = limit;
        this._reset = reset;
        /**
         * The version of this BucketManager.
         * Used for backwards compatibility.
         * Do not change this value!
         * @type {number}
         */
        this[_version] = 1;
    }
    /**
     * Get a bucket by its snowflake
     * @param {*} snowflake The snowflake of the Bucket to return
     * @returns {Bucket} The bucket with the given snowflake
     */
    get(snowflake) {
        return this[_getOrCreate](snowflake);
    }

    /**
     * Check if a specified bucket can be drawn a specified amount of times
     * @param {*} snowflake The snowflake of the bucket to check
     * @param {number} [amount=1] The number of draws to check
     * @returns {boolean} Whether or not it can draw
     */
    canDraw(snowflake, amount = 1) {
        ensure.defined(snowflake);
        return this[_getOrCreate](snowflake).canDraw(amount);
    }

    /**
     * Draw from a specified bucket if possible
     * @param {*} snowflake The snowflake of the bucket to draw from
     * @param {number} [amount=1] The number of times to draw from the bucket
     * @returns {number} Whether or not the amount was able to be drawn from the bucket
     */
    draw(snowflake, amount = 1) {
        ensure.defined(snowflake);
        return this[_getOrCreate](snowflake).draw(amount);
    }

    /**
     * Draw from a specified bucket as many times as possible
     * Stops when the remaining uses reaches zero
     * @param {*} snowflake The snowflake of the bucket to draw from
     * @param {number} [amount=1] The number of times to draw from the bucket
     * @returns {number} The amount that was able to be drawn from the bucket (n <= amount)
     */
    drawMax(snowflake, amount = 1) {
        ensure.defined(snowflake);
        return this[_getOrCreate](snowflake).drawMax(amount);
    }

    /**
     * Forcefully draw from a specified bucket
     * @param {*} snowflake The snowflake of the bucket to draw from
     * @param {number} [amount=1] The number of times to draw from the bucket
     * @returns {number} The number of remaining uses. May be negative.
     */
    drawForce(snowflake, amount = 1) {
        ensure.defined(snowflake);
        return this[_getOrCreate](snowflake).drawForce(amount);
    }

    /**
     * Reset a specified bucket's usage count and reset time if it exists
     * @param {*} snowflake The snowflake of the bucket to draw from
     * @returns {void}
     */
    reset(snowflake) {
        ensure.defined(snowflake);
        const bucket = this.buckets.get(snowflake);
        if (bucket) {
            bucket.reset();
        }
    }

    /**
     * Get a specified bucket's remaining number of allowed uses before next reset
     * @param {*} snowflake The snowflake of the bucket to draw from
     * @returns {number} The remaining number of uses
     */
    remainingUses(snowflake) {
        ensure.defined(snowflake);
        this[_getOrCreate](snowflake).remainingUses;
    }

    /**
     * Get a specified bucket's remaining time until the next reset, in milliseconds
     * @param {*} snowflake The snowflake of the bucket to draw from
     * @returns {number} The time until the next reset
     */
    timeUntilNextReset(snowflake) {
        ensure.defined(snowflake);
        this[_getOrCreate](snowflake).remainingTime;
    }

    /**
     * Save this BucketManager's data as JSON
     * This allows the data to be loaded at a later date for ratelimit persistence among longer time periods
     * @returns {string} The JSON representation of this bucketManager
     */
    save() {
        return JSON.stringify({
            version: this[_version],
            limit: this.limit,
            reset: this.reset,
            buckets: Array.from(this.buckets)
        });
    }

    /**
     * Load a BucketManager from a saved JSON string
     * @param {string} json The JSON string to load from
     * @returns {BucketManager} A BucketManager with the stored data
     */
    static load(json) {
        json = JSON.parse(json);
        const { version } = json;
        if (version === 1) {
            const { limit, reset, buckets } = json;
            const bucketManager = new BucketManager(limit, reset);
            Object.assign(bucketManager, {
                [_version]: version,
                buckets: new Map(buckets)
            });
            return bucketManager;
        }
        return null;
    }

    [_getOrCreate](snowflake) {
        if (!this.buckets.has(snowflake)) {
            this.buckets.set(snowflake, new Bucket(this, snowflake));
        }
        return this.buckets.get(snowflake);
    }

    /**
     * Get the Bucket class
     * @returns {Bucket} The Bucket class
     */
    static get Bucket() {
        return Bucket;
    }
};

module.exports = { Bucket, BucketManager };