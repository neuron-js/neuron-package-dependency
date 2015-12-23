/* jshint node: true */
'use strict';

var glob = require('glob');
var path = require('path');

function filterDirectories(wd, options, done) {
  var directoriesPattern = path.join(wd, "*/");
  glob(directoriesPattern, function(err, directories) {
    if(err) { return done(err);}
    done(null, directories, options);
  });
}

module.exports = filterDirectories;
