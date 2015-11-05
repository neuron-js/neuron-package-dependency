/* jshint node: true */
'use strict';
var neuronJson = require("neuron-json");
var async = require('async');
var path = require('path');

function readNeuronJsons(dirs, done) {
  async.map(dirs, readNeuronJSON, function(err, pkgsInfo) {
    if(err) {return done(err);}
    done(null, pkgsInfo);
  });
}

function readNeuronJSON(dir, done) {
  neuronJson.read(dir, function (err, pkgInfo) {
    if(err) {
      return done(err);
    }
    pkgInfo.packageRoot = dir;
    done(null, pkgInfo);
  });
}

module.exports = readNeuronJsons;
