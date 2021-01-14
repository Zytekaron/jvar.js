/**
 * A function to replace the typeof operator
 * @param obj - The object to check the type of
 * @returns {string} - The type of the object
 * @example
 * type("Hi");       // 'string'
 * type([]);         // 'array'
 * type(new Date()); // 'date'
 */
module.exports = obj => {
    if (obj == null) {
        return obj + '';
    }
    if (Number.isNaN(obj)) {
        return 'nan';
    }
    return obj.constructor.name.toLowerCase();
};
