/* jshint node: true */
'use strict';

var expect = require('chai').expect;
var path = require('path');

var options = {
  output: __dirname + '/result.json'
};

var writeOutput = require('../lib/writeOutput')(options);

var packageDependencies = JSON.stringify({"0":{"mod_a":{"*":{"dependencies":{"e":"*","m":"*"},"asyncDependencies":{"f":"*"}}},"f":{"*":{}},"e":{"*":{}},"m":{"*":{}}},"version":1445184699428});

writeOutput(packageDependencies, function(err) {
  if(err) { throw err;}
  console.log('finished');
});
