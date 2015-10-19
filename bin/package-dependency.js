#! /usr/bin/env node

var commander = require('commander');
var path = require('path');

var cwdVal, outputVal;
commander
  .version('1.0.0')
  .option('--cwd [path]', 'Set working directory')
  .option('--output <filename>', 'Set output filename')
  .parse(process.argv);

if(!commander.output) {
  console.warn("Parameter \'--output\' is required.");
  process.exit(1);
}

if(!commander.cwd) {
  commander.cwd = process.cwd();
}

if(!path.isAbsolute(commander.cwd)) {
  commander.cwd = path.join(process.cwd(), commander.cwd);
}

var neuron_package_dependency = require('../index.js');

neuron_package_dependency(commander.cwd, commander.output);
