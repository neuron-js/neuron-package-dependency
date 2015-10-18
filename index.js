/* jshint node: true */
'use strict';

var async = require('async');
var filterDirectories = require('./lib/filterDirectories');
var readNeuronJSONs = require('./lib/readNeuronJsons');
var resolvePackageDependencies = require('./lib/resolvePackageDependencies');
var writeOutput = require('./lib/writeOutput');

function neuronPackageDependency(cwd, output) {
  async.waterfall([
    function(done) {
      done(null, cwd);
    },
    filterDirectories,
    readNeuronJSONs,
    resolvePackageDependencies,
    function(dependencyTrees, done) {
      done(null, output, JSON.stringify(dependencyTrees));
    },
    writeOutput
  ], function(err) {
      if(err) {
        throw err;
      }
      console.log('All packages\' dependencies resolved.\nPlease check ' + output + ' for details.');
    });
}

module.exports = neuronPackageDependency;
