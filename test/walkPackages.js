/* jshint node: true */
'use strict';

var expect = require('chai').expect;
var path = require('path');
var walkPackages = require('../lib/walkPackages');

describe("walk multiple packages", function() {
  var neuronJSONs = [
    {
    name: 'mod_a',
    main:  './index.js',
    entries: [],
    root: __dirname + '/fixtures/mod_a'

  }
  ];

  var expectResults = [{
    '/mod_a/index.js': {
      entry: true,
      require: {
        './lib/c': './lib/c.js',
        'e': 'e'
      },
      aysnc: {}
    },
    './lib/c': {
      require: {},
      async: {}
    },
    'e': {
      foreign: true
    }
  }];

  it("returns a regular package info", function(done) {
    function test(err, results) {
      expect(results).deep.equal(expectResults);
      done();
    }
    walkPackages([__dirname + '/fixtures/mod_a/index.js'], test);
  });
});
