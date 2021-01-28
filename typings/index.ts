// For obvious reasons, we cannot use the amazing full-path imports with TS.

// Functions
import { fn, math } from 'jvar';
const { factorial, fibonacci } = math;
const { fuzzy, inspect } = fn;

// Classes
import { BitSet, Cherry, Enum, Lex } from 'jvar';

// Class: BitSet
const bits1 = new BitSet(0b10101);
const bits2 = new BitSet(0b01011);
// soontm

// Class: Cherry
const cherry = new Cherry<object>(); // Cherry for storing objects
cherry.set('272659147974115328', { username: 'Zytekaron', id: '272659147974115328' });
console.log(cherry.get('272659147974115328')); // { username: Zytekaron, id: '272659147974115328' }

// Class: Enum
const Color = new Enum({
    RED: 0xFF0000,
    GREEN: 0x00FF00,
    BLUE: 0x0000FF
} as const);
console.log(Color.RED); // this won't work, either needs explicit declarations for types or not at all
console.log(Color.get('RED')); // 0xFF0000 :: decimal
console.log(Color.get('BLUE')); // 0x00FF00 :: decimal
console.log(Color.has('PURPLE')); // false
console.log(Color.list()); // ['RED', 'BLUE', 'GREEN']

// Class: Lex
const lexer = new Lex({
    silent: Boolean
}, {
    s: 'silent'
});
console.log(lexer.lex('hello world --silent -s')); // { args: ['hello world'], flags: { silent: true } }
