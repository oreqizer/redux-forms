const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');

const chalk = require('chalk');
const through = require('through2');


const base = './packages/redux-forms/src/**/*.{ts,tsx}';

const srcts = [
  './packages/*/src/**/*.{ts,tsx}',
  '!' + base,
  '!**/__tests__/**',
];

const srcbabel = './packages/*/lib/**/*.js';

const dest = './packages';

const tsOptions = {
  module: 'es6',
  target: 'es6',
  jsx: 'react',
  declaration: true,
  noImplicitAny: true,
  strictNullChecks: true,
};

const mapDest = (path) => path.replace(/(packages\/[^/]+)\/src\//, '$1/lib/');


gulp.task('default', ['babel']);

gulp.task('ts:base', () =>
  gulp.src(base)
    .pipe(plumber())
    .pipe(through.obj((file, enc, callback) => {
      gutil.log(`Compiling ${chalk.blue(file.path)}...`);
      callback(null, file);
    }))
    .pipe(ts(tsOptions))
    .pipe(through.obj((file, enc, callback) => {
      file.path = mapDest(file.path);
      callback(null, file);
    }))
    .pipe(gulp.dest('./packages/redux-forms/lib/')));

gulp.task('ts', ['ts:base'], () =>
  gulp.src(srcts)
    .pipe(plumber())
    .pipe(through.obj((file, enc, callback) => {
      gutil.log(`Compiling ${chalk.blue(file.path)}...`);
      callback(null, file);
    }))
    .pipe(ts(tsOptions))
    .pipe(through.obj((file, enc, callback) => {
      file.path = mapDest(file.path);
      callback(null, file);
    }))
    .pipe(gulp.dest(dest)));

gulp.task('babel', ['ts'], () =>
  gulp.src(srcbabel)
    .pipe(plumber())
    .pipe(through.obj((file, enc, callback) => {
      gutil.log(`Transpiling ${chalk.yellow(file.path)}...`);
      callback(null, file);
    }))
    .pipe(babel())
    .pipe(gulp.dest(dest)));
