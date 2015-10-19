/*jslint node: true */
'use strict';
var path = require('path');
var async = require('async');
var _ = require('underscore');
var walkPackages = require('./walkPackages');

function resolvePackageDependencies(packageJSONs, done) {
  async.map(packageJSONs, _resolvePackageDependencies, function(err, pkgTrees) {
    if(err) {done(err);}
    var packageDependencies = {};
    pkgTrees.forEach(function(pkgTree){
      _.extend(packageDependencies, pkgTree);
    });
    packageDependencies._version = Date.now();

    done(null, packageDependencies);
  });
}


function _resolvePackageDependencies(packageInfo, done) {
  var pkgTree = {};
  pkgTree[packageInfo.name] = {};

  var walkPathes = packageInfo.entries; // shadow copy
  if(packageInfo.main) {
    walkPathes.push(packageInfo.main);
  }

  packageInfo.dependencies = packageInfo.dependencies || {};
  packageInfo.asyncDependencies = packageInfo.asyncDependencies || {};

  walkPathes = walkPathes.map(function(walkPath){
    return path.join(packageInfo.packageRoot, walkPath);
  });

  var dependencies = {}, asyncDependencies = {};

  walkPackages(walkPathes, function(err, pkgNodesArray) {
    if(err) { done(err); }
    walkPathes.forEach(function(walkPath){
      var pkgNodes = _.find(pkgNodesArray, function(pkgNodes){ return pkgNodes[walkPath];});
      _.each(pkgNodes,function(node) {
        if(node.foreign) {
          var packageVersion = packageInfo.dependencies[node] || '*';
          pkgTree[node.id] = {};
          pkgTree[node.id][packageVersion] = {};
        }
        if(node.require) {
          _.each(node.require, function(dep){
            if(pkgNodes[dep].foreign) {
              var foreignDepVersion = packageInfo.dependencies[dep] || '*';
              var foreignDepName = [dep, '@', foreignDepVersion].join('');
              dependencies[foreignDepName] = foreignDepVersion;
            }
          });
        }
        if(node.async) {
          _.each(node.async, function(dep){
            if(pkgNodes[dep].foreign) {
              var foreignDepVersion = packageInfo.asyncDependencies[dep] || '*';
              var foreignDepName = [dep, '@', foreignDepVersion].join('');
              asyncDependencies[foreignDepName] = foreignDepVersion;
            }
          });
        }
      });
    });
    pkgTree[packageInfo.name]['*'] ={
      dependencies: dependencies,
      asyncDependencies: asyncDependencies
    };
    done(null, pkgTree);
  });
}

module.exports = resolvePackageDependencies;
