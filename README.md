# jvar.js
```
npm install jvar --save
```

<br>

This library is primarily documented using JSDoc; examples may not be extensive or include all available features. Proper documentation may be created in the future.

<br>

## Importing with jvar
<b>Examples</b>
```js
// Full-destructure importing
const {
    math: { factorial, fibonacci },
    fn: { fuzzy, inspect }
} = require('jvar');

// Full-path importing
const factorial = require('jvar/math/factorial');
const fibonacci = require('jvar/math/fibonacci');
const fuzzy = require('jvar/fn/fuzzy');
const inspect = require('jvar/fn/inspect');

// A mix of the two
const { factorial, fibonacci } = require('jvar/math');
const { fuzzy, inspect } = require('jvar/fn');

// importing Enum, Cherry, or BitSet
const Enum = require('jvar/enum');
const Cherry = require('jvar/cherry');
const BitSet = require('jvar/bitset');

const { Enum, Cherry, BitSet } = require('jvar');

// Sorry, no documentation for the fancy import ? from ? as ? stuff yet :/
```

<br>

## Enum
<b>Example: Color.js<b>
```js
const Enum = require('jvar/enum');
module.exports = new Enum({
    RED: 0xFF0000,
    GREEN: 0x00FF00,
    BLUE: 0x0000FF
});
```
<b>Usage</b>
```js
const Color = require('./Color');
console.log(Color.RED); // 0xFF0000 :: decimal
console.log(Color.get("BLUE")); // 0x00FF00 :: decimal
console.log(Color.has("PURPLE")); // false
console.log(Color.list()); // ['RED', 'BLUE', 'GREEN']
```

<br>

## BitSet
<b>Example Usage<b>
```js
const BitSet = require('./bitset');
const bits1 = new BitSet(0b10101);
const bits2 = new BitSet(0b01011);
// Full example coming soon
// Planned feature: non-mutating methods
bits1.and(bits2).or(0b1111).xor(7);
```

<br>

## Mathematics
<b>Math Functions</b>
```js
const {
    factorial,
    fibonacci,
    random,
    root
} = require('jvar/math');

factorial(4); // 4! or 4 * 3 * 2 * 1 -> 24
fibonacci(8); // 1, 1, 3, 5, 8, ... -> 34
random.random(1, 10); // random float from 1 to 10
random.randomInt(1, 10); // random int from 1 to 10
random.secureRandom(1, 10); // cryptographically secure random float from 1 to 10
random.secureRandomInt(1, 10); // cryptographically secure random int from 1 to 10
root(64, 3); // aka Math.pow(n, 1 / nthRoot); -> 4   (4 ^ 3 = 64)

// SECURITY DISCLAIMER
// Please read the source code and decide for yourself if the
// secureRandom math functions are truly safe!!!
// https://github.com/Zytekaron/jvar.js/blob/master/math/random.js#L37
// https://github.com/Zytekaron/jvar.js/blob/master/math/random.js#L55
```

<br>

## Functions
<b>Various utilities</b>
```js
const { conform, constrain, fuzzy, group, inspect, isEmpty, isIterable, percent, regexEscape, sameType, type } = require('jvar/fn');
conform(0.53, 0, 1, 0, 100); // conform a number from one range to another -> 53
constrain(0, 10, 100); // constrain a number to a certain range -> 10
fuzzy("NASA", "National Aeronautics and Space Administration"); // Fuzzy search -> true
group(/* follow the jsdoc */); // complicated function
inspect({ a: '1', b: "2" }); // require('util').inspect but with fixed strings -> `{ a: '1', b: '2' }`
isEmpty([]); // iterable empty checks -> true
isIterable({}); // object iterability checks -> true
percent(/* follow the jsdoc */); // complicated function
regexEscape('Twitter blocks your passwords...see: ***'); // escape regular expression stuff in strings -> 'Twitter blocks your passwords\.\.\.see: \*\*\*'
sameType(1, 2, 9); // object type comparing -> true
type(new Map()); // better typeof operator -> 'Map'
```