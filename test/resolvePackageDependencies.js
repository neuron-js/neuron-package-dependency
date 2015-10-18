/* jshint node: true */
'use strict';

var expect = require('chai').expect;
var resolvePackageDependencies = require('../lib/resolvePackageDependencies');

var glob = require('glob');

var dirs = glob.sync(__dirname + '/fixtures/mod_a/');

var neuronJsons = [{
  name: 'mod_a',
  main: '',
  entries: ['./b.js', './index.js'],
  'packageRoot': __dirname + '/fixtures/mod_a/'
}];

resolvePackageDependencies(neuronJsons, function(err, results) {
  console.log(JSON.stringify(results));
});
