/* jshint node: true */
'use strict';
var neuronJson = require("neuron-json");
var async = require('async');
var path = require('path');
var _ = require('underscore');
var opts;

function readNeuronJsons(dirs, options, done) {
  opts = options;
  async.map(dirs, readNeuronJSON, function(err, pkgsInfo) {
    if(err) {return done(err);}
    // trim empty pkg
    pkgsInfo = pkgsInfo
      .filter(function(pkg){
        return !_.isEmpty(pkg)
          // if a package has dist, then skip parsing dependencies
          && !pkg.dist
      })

    done(null, pkgsInfo, options);
  });
}

function readNeuronJSON(dir, done) {
  neuronJson.read(dir, function (err, pkgInfo) {
    if(err) {
      if(err.code === 'NEURON_NO_ENTRY' && opts.allowEmpty) {
        // pass
        return done(null, {});
      } else {
        return done(err);
      }
    }
    pkgInfo.packageRoot = dir;
    done(null, pkgInfo);
  });
}

module.exports = readNeuronJsons;
