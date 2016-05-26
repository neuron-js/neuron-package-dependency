'use strict'

module.exports = get

const node_path = require('path')
const async = require('async')
const commonjs_walker = require('commonjs-walker')
const read = require('./read-json')
const _ = require('underscore')

const TYPES = [
  'require',
  'resolve',
  'async'
]


function get (dir, options, callback) {
  read(dir, options, (err, pkg) => {
    if (err) {
      return callback(err)
    }

    let walker = commonjs_walker()

    if (options.compilers) {
      walker.register(options.compilers)
    }

    let entries = pkg.entries
    if (pkg.main) {
      entries.push(pkg.main)
    }

    entries = entries.map((entry) => node_path.join(dir, entry))

    walker.walk(entries).done((err, nodes) => {
      if (err) {
        return callback(err)
      }

      let dependencies = {}

      each_node(nodes, (name, type) => {
        if (!nodes[name].foreign) {
          return
        }

        let id = `${name}@*`
        dependencies[id] = '*'
      })

      callback(null, {
        pkg: pkg,
        nodes: nodes,
        dependencies: dependencies
      })
    })
  })
}


function each_node (nodes, callback) {
  _.each(nodes, (info, id) => {
    TYPES.forEach((type) => {
      let deps = info[type]

      if (!deps) {
        return
      }

      _.each(deps, (resolved, dep) => {
        callback(resolved, type)
      })
    })
  })
}
