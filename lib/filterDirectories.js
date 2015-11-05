/* jshint node: true */
'use strict';

var glob = require('glob');
var path = require('path');

function filterDirectories(wd, done) {
  var directoriesPattern = path.join(wd, "*/");
  glob(directoriesPattern, function(err, directories) {
    if(err) { return done(err);}
    done(null, directories);
  });
}

module.exports = filterDirectories;
