// called by mocha
const requireDir = require('require-dir');

require('babel-register')({
  ignore: /node_modules/,
  extensions: ['.js', '.jsx']
});

requireDir('./tests', {
  recurse: true
});
