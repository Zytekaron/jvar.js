const { type } = require('../utility/ensure');

/**
 * Lex - A string lex and parser for quoted strings and typed flags
 * @class Enum
 */
class Lex {
    /**
     * Create a new Lex with specified flags (optional)
     * @param flags - An object of flag names to parse functions (JavaScript types work for this -- Boolean, String, Number...)
     * @param aliasFlags - An object of flag aliases to their full flag name (one character per alias)
     */
    constructor(flags = {}, aliasFlags = {}) {
        this.flags = flags;
        this.aliasFlags = aliasFlags;

        for (const key of Object.keys(flags)) {
            if (key.includes(' ')) {
                throw new Error('Spaces are not allowed in flag names: ' + key);
            }
        }

        for (const key of Object.keys(aliasFlags)) {
            if (!/^[^\d -]$/.test(key)) {
                throw new Error('Flag aliases must be one non-space, non-number, non-hyphen character.');
            }
        }
    }

    /**
     * Lex a string
     * @param str The string to lex
     * @returns {{args: array<string>, flags: object}}
     */
    lex(str) {
        const { flags: inputFlags, aliasFlags } = this;

        const result = [];
        const flags = {};

        let buffer = [];
        let char;

        let i = 0;

        function advance() {
            return char = str[i++];
        }

        while (advance()) {
            switch (char) {
                case '"':
                    result.push(readQuotedString());
                    break;
                case '-':
                    if (advance() === '-') {
                        readFlag();
                    } else {
                        readFlags();
                    }
                    break;
                default:
                    const res = readString();
                    if (res) {
                        result.push(res);
                    }
            }
        }

        function readFlag() {
            advance();
            if (/\\/.test(char)) {
                buffer.push('--');
                advance();
                result.push(read());
                return;
            }
            if (/\d/.test(char)) {
                buffer.push('--');
                result.push(read());
                return;
            }
            const id = read('=', ':');

            const flag = inputFlags[id];
            if (!flag || flags[id]) {
                result.push('--' + id);
                return;
            }

            handleFlag(flag, id);
        }

        function readFlags() {
            if (/\\/.test(char)) {
                buffer.push('-');
                result.push(read());
                return;
            }
            const aliases = read('=', ':');

            const bad = [];
            for (const alias of aliases) {
                const id = aliasFlags[alias];
                const flag = inputFlags[id];
                if (flags[id] || !flag) {
                    bad.push(alias);
                    continue;
                }
                handleFlag(flag, id);
            }
            if (bad.length) {
                result.push('-' + bad.join(''));
            }
        }

        function handleFlag(flag, id) {
            switch (flag) {
                case Boolean:
                    flags[id] = true;
                    break;
                default:
                    if (type(flag) === 'function') {
                        advance();
                        flags[id] = flag(readString());
                    } else {
                        throw new Error('No parser for type ' + flag);
                    }
            }
        }

        function read(...c) {
            c = [' ', ...c];
            while (char && !c.includes(char)) {
                buffer.push(char);
                advance();
            }
            return buffer.splice(0).join('');
        }

        function readString() {
            if (char === '"') {
                return readQuotedString();
            }

            return read();
        }

        function readQuotedString() {
            const buf = [];
            while (advance() && char !== '"') {
                if (char === '\\') {
                    advance();
                    buf.push(char);
                    continue;
                }
                buf.push(char);
            }
            advance();
            return buf.join('');
        }

        return {
            args: result.map(s => s.trim()),
            flags
        };
    }
}
