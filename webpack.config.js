var path = require('path');

module.exports = {
  entry: {
    a: './src/index.js',
    b: './src/index2.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
