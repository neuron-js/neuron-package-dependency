/* jshint node: true */
'use strict';
var walker = require('commonjs-walker')();
var async = require('async');


function walkPackages(entries, done) {
  async.map(entries, walker.walk.bind(walker), function(err, pkgNodes) {
    if(err) {done(err);}
    done(err, pkgNodes);
  });

  
  // var pkgNodes = {}, index = 0, entriesLength = entries.length;
  // if(entriesLength === 0) {
  //   done("no entries or main found.");
  // }
  //
  // entries.forEach(function(entry) {
  //   walker.walk(entry, function(err, nodes){
  //     if(err){ done(err); }
  //
  //     pkgNodes.push(nodes);
  //     index++;
  //     if(index === entriesLength) {
  //       done(null, pkgNodes);
  //     }
  //   });
  // });
}

module.exports = walkPackages;
