/*jslint node: true */
'use strict';
var path = require('path');
var async = require('async');
var _ = require('underscore');
var walker = require('commonjs-walker')();

function resolvePackageDependencies(packageJSONs, done) {
  var pkgDeps = {};

  packageJSONs.forEach(function(packageInfo) {
    var pkgName = packageInfo.name, pkgVersion = packageInfo.version || '*';
    pkgDeps[pkgName] = {};

    var walkPathes = packageInfo.entries; // shallow copy
    if(packageInfo.main) {
      walkPathes.push(packageInfo.main);
    }
    walkPathes = walkPathes.map(function(walkPath){
      return path.join(packageInfo.packageRoot, walkPath);
    });

    // temporarily used variables
    pkgDeps[pkgName].walkPathes = walkPathes;
    pkgDeps[pkgName].packageInfo = packageInfo;
    pkgDeps[pkgName].version = pkgVersion;

    walker.walk(walkPathes);
  });

  walker.done(function(err, nodes) {
    if(err) { done(err);}

    for(var mod in pkgDeps) {
      var walkPathes = pkgDeps[mod].walkPathes,
          packageInfo = pkgDeps[mod].packageInfo,
          version = pkgDeps[mod].version;

      pkgDeps[mod][version] = {};
      packageInfo.dependencies = packageInfo.dependencies || {};
      packageInfo.asyncDependencies = packageInfo.asyncDependencies || {};
      walkPathes.forEach(function(entry) {
        _parseDepTree(pkgDeps[mod][version], nodes[entry], nodes, packageInfo);
      });

      delete pkgDeps[mod].walkPathes;
      delete pkgDeps[mod].packageInfo;
      delete pkgDeps[mod].version;
    }

    done(null, pkgDeps);
  });
}

function _parseDepTree(deps, node, nodes, moduleInfo) {
  if(node.foreign) {
    var versionNumber = moduleInfo.dependencies[node] || '*',
        mod_id = [node.id, '@', versionNumber].join('');
    return {id: mod_id, version: versionNumber};
  }

  if(node.require) {
    deps.dependencies || (deps.dependencies = {});
    for(var entry in node.require) {
      var _node = nodes[node.require[entry]];
      var mod = _parseDepTree(deps, _node, nodes, moduleInfo);
      if(mod){
        deps.dependencies[mod.id] = mod.version;
      }
    }
  }

  if(node.async) {
    deps.asyncDependencies || (deps.asyncDependencies = {});
    for(var entry in node.async) {
      var _node = nodes[node.async[entry]];
      var mod = _parseDepTree(deps, _node, nodes, moduleInfo);
      if(mod){
        deps.asyncDependencies[mod.id] = mod.version;
      }
    }
  }
}

module.exports = resolvePackageDependencies;
