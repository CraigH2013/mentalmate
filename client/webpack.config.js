const path = require('path');

const config = {
  entry: {
    login: './src/login/index.jsx',
    profile: './src/profile/index.jsx',
    signup: './src/signup/index.jsx',
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '..', 'server', 'public', 'js'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};

module.exports = config;
