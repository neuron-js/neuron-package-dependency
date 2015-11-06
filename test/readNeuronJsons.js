/* jshint node: true */
'use strict';

var expect = require('chai').expect;
var glob = require('glob');
var readNeuronJsons = require('../lib/readNeuronJsons');

describe("read a package", function() {
  it("returns an expect neuron package json array" , function(done){
    var dirs = glob.sync(__dirname + '/fixtures/mod_a/');
    var expectResult = [{
      name: 'mod_a',
      main: './index.js',
      entries: [],
      css: [],
      version: '*',
      'packageRoot': (__dirname + '/fixtures/mod_a/')
    }];
    function test(err, result) {
      expect(result).to.be.an('array')
                    .and.deep.equal(expectResult);
      done();
    }

    readNeuronJsons(dirs, test);
  });
});

describe("read a empty directory", function() {
  it("returns an expect neuron package json array", function(done){
    var dirs = glob.sync(__dirname + '/fixtures/mod_b/');
    var expectResult = [{
      name: 'mod_b',
      main: './index.js',
      entries: [],
      css: [],
      version: '*',
      packageRoot: __dirname + '/fixtures/mod_b/'
    }];
    function test(err, result) {
      expect(result).deep.equals(expectResult);
      done();
    }

    readNeuronJsons(dirs, test);
  });
});

describe("read a multiple packages", function() {
  it("returns an expect neuron package json array", function(done){
    var dirs = glob.sync(__dirname + '/fixtures/*/');
    var expectResult = [
      {
        name: 'mod_a',
        main: './index.js',
        entries: [],
        css: [],
        version: '*',
        'packageRoot': (__dirname + '/fixtures/mod_a/')
      },
      {
        name: 'mod_b',
        main: './index.js',
        entries: [],
        css: [],
        version: '*',
        packageRoot: __dirname + '/fixtures/mod_b/'
      }
    ];
    function test(err, result) {
      // expect(err).not.to.be.null;
      expect(result).deep.equals(expectResult);
      done();
    }

    readNeuronJsons(dirs, test);
  });
});
