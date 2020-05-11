/**
 * Calculate the number of samples of a given set are required to have a given percentage chance there will be at least one collison
 *
 * This is described as the Birthday Paradox (or Birthday Effect)
 * @param {number} size The number of distinct values in the given set
 * @param {number} probability The desired decimal probability of at least one collision
 * @returns {number} The number of samples required (with a decimal)
 * @example
 * 50% chance of a birthday collision after ~23 people are selected
 * collisions(365, 0.5); // 22.49438689559598 -- common birthday effect example
 */
module.exports = (size, probability) => Math.sqrt(2 * size * Math.log(1 / (1 - probability)));