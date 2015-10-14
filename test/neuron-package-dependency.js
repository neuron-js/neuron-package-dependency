'use strict';

var expect = require('chai').expect;
var neuron_package_dependency = require('../');

var walker = require('commonjs-walker')();
var path = require('path');

var fakePackageJSON = {
  'name': 'mod_a',
  'entries': [
    '/a.js',
    '/b.js',
    '/lib/c.js'
  ],
  'main': '/index.js',
  'dependencies': {
    'f': '*',
    'g': '1.0.0'
  },
  'asyncDependencies': {
    'e': '*'
  }
};

walker.walk(path.join(process.cwd(), 'mod_a','/a.js'), function(err, nodes) {
  console.log(nodes);
});
