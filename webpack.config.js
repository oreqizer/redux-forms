/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const R = require('ramda');

const packages = require('./webpack.packages.js');


const env = process.env.NODE_ENV;

const config = {
  // package.entry
  // package.externals
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'babel-loader!ts-loader', exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    // package.outputPath
    // package.outputFilename
    // package.outputLibrary
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    })  // eslint-disable-line comma-dangle
  );
}

module.exports = R.map((pkg) => R.compose(
  R.assoc('entry', pkg.entry),
  R.assoc('externals', pkg.externals),
  R.assocPath(['output', 'path'], pkg.outputPath),
  R.assocPath(['output', 'filename'], pkg.outputFilename),
  R.assocPath(['output', 'library'], pkg.outputLibrary)
)(config), packages);
