/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');

const config = {
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};

module.exports = config;
