const { get: _get } = require('lodash');

/**
 * Format a string, similar in nature to the Rust formatter
 * @param {array} string - The format string
 * @param {...*} args - An array of arguments for the formatter
 * @returns {string} - The formatted string
 * @example
 * format("Hi there, {}!", "bob"); // 'Hi there, bob!'
 * format("Hi there, {name}!", user); // 'Hi there, bob!' -- accesses `user.name`
 * format("{} + {} = {}", 2, 2, 4); // '2 + 2 = 4'
 * format("{{}} {}", 7); // '{} 7' -- escaped braces (only required on the open brace)
 * format("{members[0].name}", guild); // string value of guild.members[0].name
 */
module.exports = (string, ...args) => {
    const out = [];

    for (let i = 0; i < string.length; i++) {
        if (string[i] === '{') {
            i++;
            if (string[i] === '{') {
                out.push('{');
                continue;
            }

            if (string[i] === '}') {
                out.push(args.shift());
            } else {
                const buf = [];
                while (string[i] !== '}') {
                    buf.push(string[i++]);
                }

                const value = _get(args.shift(), buf.join(''));
                out.push(value);
            }

            i++;
        }

        if (string[i] === '}' && string[i + 1] === '}') {
            i++;
        }

        out.push(string[i]);
    }

    return out.join('');
};
