/* jshint node: true */
'use strict';

var async = require('async');
var filterDirectories = require('./lib/filterDirectories');
var readNeuronJSONs = require('./lib/readNeuronJsons');
var resolvePackageDependencies = require('./lib/resolvePackageDependencies');

function neuronPackageDependency(cwd, options, done) {
  async.waterfall([
    function(done) {
      done(null, cwd, options);
    },
    filterDirectories,
    readNeuronJSONs,
    resolvePackageDependencies
  ], function(err, dependencyTree) {
      if(err) {
        done(err);
      }
      done(null, dependencyTree);
    });
}

module.exports = neuronPackageDependency;
