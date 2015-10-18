/* jshint node: true */
'use strict';

var expect = require('chai').expect;
var neuron_package_dependency = require('../index.js');

var options = {
  cwd: __dirname + '/fixtures',
  output: __dirname + '/results.json'
};

neuron_package_dependency(options);
