const path = require('path');

module.exports = {
  mode: 'none',
  entry: path.resolve(__dirname, 'test.scss'),
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ['css-loader', 'sass-loader'],
      },
    ],
  },
};
