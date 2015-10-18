/* jshint node: true */
'use strict';

var expect = require('chai').expect;
var _walk_package = require('../lib/_walkPackage');

var _walkPackage = _walk_package;

var neuronJSON = {
  name: 'mod_a',
  main: './index.js',
  entries: ['./b.js'],
  root: __dirname + '/fixtures/mod_a'
};

var expectResult = {};
expectResult[__dirname + '/fixtures/mod_a/a.js'] = {};
expectResult[__dirname + '/fixtures/mod_a/index.js'] = {"entry": true};
expectResult['e'] = {};
expectResult[__dirname + '/fixtures/mod_a/lib/c.js'] = {};

describe("walk a package with require dependencies", function() {

  it("returns a regular package info", function(done) {
    function test(err, result) {
      expect(result.e).to.have.property('foreign', true);
      expect(result.f).to.have.property('foreign', true);
      done();
    }
    _walkPackage(neuronJSON, test);
  });
});

// describe("walk a empty folder", function() {
//   var neuronJSON = {
//     name: 'mod_b',
//     main: '',
//     entries: []
//   };
//
//   it("returns an err with message \'no entries or main found.\'", function(done) {
//     function test(err) {
//       expect(err).equals("no entries or main found.");
//       done();
//     }
//     _walkPackage(neuronJSON, test);
//   });
// });
