/* jshint node: true */
'use strict';

var fse = require('fs-extra');

function writeOutput(outputPath, packageDependencies, done) {
  fse.outputFile(outputPath, packageDependencies, function(err) {
    if(err) {done(err);}
    done(null);
  });
}

module.exports = writeOutput;
