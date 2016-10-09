#!/usr/bin/env node

let commander = require('commander')
const node_path = require('path')
const neuron_config = require('neuron-project-config')
const expand = require('fs-expand')
const package_dependency = require('..')
const fse = require('fs-extra')


commander
  .version(require('../package.json').version)
  .option('--cwd [path]', 'Set working directory')
  .option('--output <filename>', 'Set output filename')
  .option('--allow-empty', 'Allow package without entries')
  .option('--compress', 'Whether should compress output json')
  .parse(process.argv)


if(!commander.output) {
  console.error('Parameter "--output" is required.');
  process.exit(1)
}


let cwd = node_path.resolve(commander.cwd || process.cwd())
let output = node_path.resolve(cwd, commander.output)
let compress = commander.compress


function fatal (err) {
  console.error('')
  console.error(err.message || err)
  console.error('')
  process.exit(1)
}

var options = {
  allowEmpty: commander.allowEmpty
}


neuron_config.read(cwd, function (err, config) {
  if (err) {
    return fatal(err.message || err)
  }

  options.compilers = config.compilers
  options.parseAST = config.parseAST

  if (!options.parseAST) {
    throw new Error(
      'parseAST(code, filename):AST should be defined in neuron.config.js,\n'
      + 'or you should use neuron-package-dependency@3.x')
  }

  var cwd = config.src

  get_names(cwd, (err, names) => {
    if (err) {
      return fatal(err)
    }

    let dirs = names.map(name => node_path.join(cwd, name))
    package_dependency(dirs, options, (err, dependencies) => {
      if (err) {
        return fatal(err)
      }

      write(dependencies)
    })
  })
})


function write (dependencies) {
  fse.outputFile(
    output,
    compress
      ? JSON.stringify(dependencies)
      : JSON.stringify(dependencies, null, 2),
    (err) => {
      if (err) {
        return fatal(err)
      }
    }
  )
}


function get_names (dir, callback) {
  expand('*', {
    cwd: dir,
    filter: 'isDirectory'
  }, callback)
}

