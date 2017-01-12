const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const chalk = require('chalk');
const through = require('through2');


const scripts = [
  './packages/*/src/**/*.{ts,tsx}',
  '!**/__tests__/**',
];

const dest = './packages2';

const tsOptions = ts.createProject('tsconfig.json', { declaration: true });

const mapDest = (path) => path.replace(/(packages\/[^/]+)\/src\//, '$1/lib/');


gulp.task('default', ['build']);

gulp.task('build', () =>
  gulp.src(scripts)
    .pipe(plumber())
    .pipe(through.obj((file, enc, callback) => {
      gutil.log(`Compiling ${chalk.cyan(file.path)}...`);
      callback(null, file);
    }))
    .pipe(ts(tsOptions))
    .pipe(through.obj((file, enc, callback) => {
      file.path = mapDest(file.path);
      callback(null, file);
    }))
    .pipe(gulp.dest(dest)));
