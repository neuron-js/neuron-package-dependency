/* jshint node: true */

'use strict';

var walker = require('commonjs-walker')();
// var read_neuron_json =  require('read-neuron-json');
var fs = require('fs');
var path = require('path');
var async = require('async');
var walker = require('commonjs-walker')();

function listFiles(wd, done){
  fs.readdir(wd, function(err, filenames){
    if(err) {throw err;}
    done(null, filenames);
  });
}

function filterDirectories(filenames, done) {
  var filepaths = filenames.map(function(filename){ return path.join(process.cwd(), filename);});
  async.map(filepaths, fs.stat, function(err, results) {
    if(err) {throw err;}
    var dirs = results.filter(function(stats) {return stats.isDirectory();});
    done(null, dirs);
  });
}

// function readPackageJSON(dirs, done) {
//
// }

function walkPackages(packageJSONs, done) {
  async.map(packageJSONs, _walkPackage, function(err, modDeps) {
    if(err) {throw err;}
    var packageDependencies = {};
    modDeps.forEach(function(dep) {
      packageDependencies[dep.name] = dep.dependencies;
    });
    done(null, modDeps);
  });
}

// walk a module
function _walkPackage(packageJSON, done) {
  var mod = {};
  mod.name = packageJSON.name;
  mod.dependencies = {};
  mod.dependencies['*'] = {}; // '*' for mod version, maybe changed later

  var walkPathes = packageJSON.entries;
  if(packageJSON.main) { walkPathes.push(packageJSON.main);}

  async.map(walkPathes, walker.walk, function(err, results) {
    if(err) {throw err;}
    var modDeps = {};
    walkPathes.forEach(function(walkPath) {
      var dependencies = findForeignDeps(results[walkPath].require || {});
      var asyncDependencies = findForeignDeps(results[walkPath].async || {});

      if(dependencies) {
        dependencies.forEach(function(dep) {
          modDeps.dependencies[dep] = packageJSON.dependencies[dep] || '*';
        });
      }

      if(asyncDependencies) {
        asyncDependencies.forEach(function(dep) {
          modDeps.asyncDependencies[dep] = packageJSON.asyncDependencies[dep] || '*';
        });
      }

    });
    mod.dependencies['*'] = modDeps;
    done(null, mod);
  });
}

function findForeignDeps(deps) {
  var foreignDeps = [];
  for(var dep in deps) {
    if(deps.hasOwnProperty(dep)) {
      if(dep.foreign) {
        foreignDeps.push(dep);
      }
    }
  }
  return foreignDeps;
}

function getDirectories() {
  async.waterfall([
    function(done) {
      done(null, process.cwd());
    },
    listFiles,
    filterDirectories
  ], function(err, result) {
    console.log(result);
  });
}

module.exports.getDirectories = getDirectories;
module.exports.listFiles = listFiles;
module.exports.walkPackages = walkPackages;
