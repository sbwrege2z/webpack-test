var path = require('path');

module.exports = {
  entry: {
    1: './src/index.js',
    2: './src/index2.js',
    3: './src/index3.js'
  },
  output: {
    filename: 'bundle[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
