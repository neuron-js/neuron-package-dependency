#!/usr/bin/env node

var commander = require('commander');
var path = require('path');
var writeOutput = require('../lib/writeOutput');


var cwdVal, outputVal;
commander
  .version('1.0.0')
  .option('--cwd [path]', 'Set working directory')
  .option('--output <filename>', 'Set output filename')
  .parse(process.argv);

if(!commander.output) {
  console.warn('Parameter "--output" is required.');
  process.exit(1);
}

if(!commander.cwd) {
  commander.cwd = process.cwd();
}

if(!path.isAbsolute(commander.cwd)) {
  commander.cwd = path.join(process.cwd(), commander.cwd);
}

var neuron_package_dependency = require('../index.js');

function fatal (err) {
  console.error('')
  console.error(err.message || err)
  console.error('')
  process.exit(1)
}

neuron_package_dependency(commander.cwd, function(err, dependencyTree) {
  if(err) {
    return fatal(err);
  }

  writeOutput(commander.output, JSON.stringify(dependencyTree), function(err) {
    if(err) {
      return fatal(err);
    }
    console.log('All packages\' dependencies resolved.\nPlease check ' + commander.output + ' for details.');
  });
});
