'use strict';

const async = require('async')
const get = require('./get')
const access = require('object-access')

module.exports = (dirs, options, callback) => {
  let dependencies = {}

  async.each(dirs, (dir, done) => {
    get(dir, options, (err, info) => {
      if (err) {
        return done(err)
      }

      let name = info.pkg.name

      access.set(dependencies, [name, '*', 'dependencies'], info.dependencies)
      done(null)
    })

  }, (err) => {
    if (err) {
      return callback(err)
    }

    callback(null, dependencies)
  })
}
