/* jshint node: true */
'use strict';

var path = require('path');
var walker = require('commonjs-walker')();


// walk a package
function _walkPackage(packageInfo, done) {
  var walkPathes = packageInfo.entries; // shadow copy
  if(packageInfo.main) {
    walkPathes.push(packageInfo.main);
  }

  walkPathes = walkPathes.map(function(walkPath){
    return path.join(packageInfo.root, walkPath);
  });

  var results = {}, index = 0, pathesLength = walkPathes.length;
  if(pathesLength === 0) {
    done("no entries or main found.");
  }

  walkPathes.forEach(function(walkPath) {
    walker.walk(walkPath, function(err, nodes){
      if(err){ done(err); }

      for(var node in nodes) {
        if(!results[node]) {
          results[node] = nodes[node];
        }
      }

      index++;
      if(index === pathesLength) {
        done(null, results);
      }
    });
  });
}

module.exports = _walkPackage;
