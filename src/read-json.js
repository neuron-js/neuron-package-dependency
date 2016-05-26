'use strict'

const neuron_json = require('neuron-json')

module.exports = (dir, options, callback) => {
  neuron_json.read(dir, (err, pkg) => {
    if(err) {
      if(err.code === 'NEURON_NO_ENTRY' && options.allowEmpty) {
        // pass
        return callback(null)
      }

      return callback(err)
    }

    callback(null, pkg)
  })
}
