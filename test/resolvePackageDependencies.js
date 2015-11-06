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

describe("resolve dependencies", function() {
  it("returns an object of dependencyTree as expectResult", function(done){
    var expectResult = {
      'mod_a': {
        '*': {
          'dependencies': {
            'e@*': '*',
            'm@*': '*',
            'z@*': '*'
          },
          'asyncDependencies': {
            'f@*': '*'
          }
        }
      }
    };

    function test(err, result) {
      expect(result).to.deep.equals(expectResult);
      done();
    }
    resolvePackageDependencies(neuronJsons, test);
  });
});
