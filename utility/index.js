const fs = require('fs');
const path = require('path');

for (const file of fs.readdirSync(__dirname)) {
    if (file === 'index.js') continue;
    module.exports[file.replace(/\.js$/, '')] = require(path.join(__dirname, file));
}