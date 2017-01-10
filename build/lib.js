const path = require('path');
const exec = require('child_process').exec;

const packages = require('./packages');


const args = [
  '-m es6',
  '-t es6',
  '-d',
  '--jsx react',
  '--noImplicitAny',
  '--strictNullChecks',
].join(' ');

const prefix = path.join(__dirname, '../node_modules/.bin/');

const cmds = packages
  .map((pkg) => [
    `${prefix}tsc ${pkg.libIn} --outDir ${pkg.libOut} ${args}`,
    `${prefix}babel ${pkg.libOut} --out-dir ${pkg.libOut}`,
  ].join(' && '));

// TODO:
// include files as globs (selectors not exported)
// clean file before building
// handle shared code better

cmds.forEach((cmd) => {
  console.log('RUNNING: ' + cmd);
  exec(cmd, function(error, stdout, stderr) {
    if (error) {
      console.error(stderr);
    }
    console.log(stdout);
  });
});
