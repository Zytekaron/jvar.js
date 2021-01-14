# jvar.js
```
npm install jvar --save
```
Support: [Discord Server](https://discord.gg/FfzwgUm/)

<br>

This library is primarily documented using JSDoc; examples may not be extensive or include all available features. Proper documentation may be created in the future, but it's not currently a priority.

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

// importing class types
const Lex = require('jvar/lex');
const Enum = require('jvar/enum');
const Cherry = require('jvar/cherry');
const BitSet = require('jvar/bitset');
// or
const { Lex, Enum, Cherry, BitSet } = require('jvar');

// ESM is not currently supported. Contact me if you need it and know how it works.
```

<br>

## Enum
<b>Example: Color.js</b>
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
<b>Example Usage</b>
```js
const BitSet = require('./bitset');
const bits1 = new BitSet(0b10101);
const bits2 = new BitSet(0b01011);
// Full example coming soon
// Planned feature: non-mutating methods
bits1.and(bits2).or(0b1111).xor(7);
```

<br>

## License
<b>jvar.js</b> is licensed under the [GNU Lesser General Public License Version 3](https://github.com/Zytekaron/jvar.js/blob/master/LICENSE)
