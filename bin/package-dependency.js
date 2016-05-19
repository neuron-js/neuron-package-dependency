#!/usr/bin/env node

var commander = require('commander');
var path = require('path');
var writeOutput = require('../lib/writeOutput');
var neuron_config = require('neuron-project-config');


var cwdVal, outputVal;
commander
  .version(require('../package.json').version)
  .option('--cwd [path]', 'Set working directory')
  .option('--output <filename>', 'Set output filename')
  .option('--allowEmpty', 'Allow package without entries')
  .option('--compress', 'Whether should compress output json')
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

var options = {
  allowEmpty: commander.allowEmpty
};


neuron_config.read(commander.cwd, function (err, config) {
  if (err) {
    return fatal(err.message || err)
  }

  options.compilers = config.compilers || []
  var cwd = config.src

  neuron_package_dependency(
    cwd,
    options,
    function(err, dependencyTree) {
      if(err) {
        return fatal(err);
      }

      writeOutput(
        commander.output,
        commander.compress
          ? JSON.stringify(dependencyTree)
          : JSON.stringify(dependencyTree, null, 2),
        function(err) {
          if(err) {
            return fatal(err);
          }
          console.log('All packages\' dependencies resolved.\nPlease check ' + commander.output + ' for details.');
        }
      );
    }
  );
})


