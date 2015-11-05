/* jshint node: true */
'use strict';
var walker = require('commonjs-walker')();
var async = require('async');


function walkPackages(entries, done) {
  // console.log(entries);
  async.map(entries, walker.walk.bind(walker), function(err, pkgNodes) {
    if(err) {done(err);}
    done(err, pkgNodes);
  });
  walker.walk(entries).done(function(err, nodes) {
    if(err) {return done(err);}
    done(nodes);
  });
}

module.exports = walkPackages;
