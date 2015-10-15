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

var basePath = path.join(process.cwd(), '/test/fixtures/');

var fakeWalkPathes = [
 basePath + 'a.js', basePath + '/b.js'
];


var fakeWalkResult1 = {};
fakeWalkResult1[fakeWalkPathes[0]] = {
  'entry': true,
  'require': {
    'e': 'e',
    './lib/c': './lib/c.js'
  }
};

fakeWalkResult1['e'] = {
  'foreign': true
};

fakeWalkResult1['./lib/c'] = {
  'require': {}
};

var fakeWalkResult2 = {};
fakeWalkResult2[fakeWalkPathes[1]] = {
  'entry': true,
  'require': {
    './d': './d.js'
  },
  'async': {
    'f': 'f'
  }
};

fakeWalkResult2['./d'] = {
  require: {
    './lib/c': './lib/c.js'
  }
};

fakeWalkResult2['f'] = {
  'foreign': true
};

fakeWalkResult2['./lib/c.js'] = {
  require: {}
};

console.log(fakeWalkResult2);

var deps = neuron_package_dependency._solveDependencies(fakeWalkPathes,[fakeWalkResult1, fakeWalkResult2], {}, {} );
console.log(deps);
