/* jshint node: true */
'use strict';

var expect = require('chai').expect;
var glob = require('glob');
var readNeuronJsons = require('../lib/readNeuronJsons');
var options = {};

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

    readNeuronJsons(dirs, options, test);
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

    readNeuronJsons(dirs, options,  test);
  });
});

describe("read a no entry package", function() {
  options = {};
  var dirs = glob.sync(__dirname + '/fixtures/mod_c/');
  it("throw an err by default", function(done){
    var expectResult = [];
    function test(err) {
      expect(err).not.to.be.empty;
      done();
    }



    readNeuronJsons(dirs, options, test);
  });
  it("returns an empty array if empty allowed", function(done){
    var expectResult = [];
    function test(err, result) {
      expect(result).deep.equals(expectResult);
      done();
    }

    options.allowEmpty = true;

    readNeuronJsons(dirs, options, test);
  });
});

describe("read multiple packages", function() {
  it("returns an expect neuron package json array", function(done){
    var dirs = glob.sync(__dirname + '/fixtures/*/');
    options.allowEmpty = true;
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
      expect(result).deep.equals(expectResult);
      done();
    }



    readNeuronJsons(dirs, options, test);
  });
});
