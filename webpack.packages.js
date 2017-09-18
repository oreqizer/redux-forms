const path = require('path');


const production = process.env.NODE_ENV === 'production';

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react',
};

const reduxExternal = {
  root: 'Redux',
  commonjs2: 'redux',
  commonjs: 'redux',
  amd: 'redux'
};

const reactReduxExternal = {
  root: 'ReactRedux',
  commonjs2: 'react-redux',
  commonjs: 'react-redux',
  amd: 'react-redux'
};


const ext = production ? '.min.js' : '.js';


module.exports = [/*{
  entry: path.join(__dirname, 'packages/redux-forms/src/index.ts'),
  outputPath: path.join(__dirname, 'packages/redux-forms/dist'),
  outputFilename: 'redux-forms' + ext,
  outputLibrary: 'ReduxForms',
  externals: {},
},*/ {
  entry: path.join(__dirname, 'packages/redux-forms-react/src/index.ts'),
  outputPath: path.join(__dirname, 'packages/redux-forms-react/dist'),
  outputFilename: 'redux-forms-react' + ext,
  outputLibrary: 'ReduxFormsReact',
  externals: {
    'react': reactExternal,
    'redux': reduxExternal,
    'react-redux': reactReduxExternal,
  },
}];
