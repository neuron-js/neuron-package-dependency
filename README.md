[![NPM version](https://badge.fury.io/js/neuron-package-dependency.svg)](http://badge.fury.io/js/neuron-package-dependency)
[![npm module downloads per month](http://img.shields.io/npm/dm/neuron-package-dependency.svg)](https://www.npmjs.org/package/neuron-package-dependency)
[![Build Status](https://travis-ci.org/neuron-js/neuron-package-dependency.svg?branch=master)](https://travis-ci.org/neuron-js/neuron-package-dependency)
[![Dependency Status](https://david-dm.org/neuron-js/neuron-package-dependency.svg)](https://david-dm.org/neuron-js/neuron-package-dependency)

# neuron-package-dependency

<!-- description -->

## Install

```sh
$ npm i -g neuron-package-dependency
```

## Usage

```sh
neuron-package-dependency [--cwd <path>] --output <filename>
```

## Developer's draft

path -> 第一层 dir

-> package.json(neuron-package-json)

-> name, entries(relative to package dir), main(), dependencies(require), asyncDependencies(async)

-> commonjs-walker

-> b -> depdendencies[b] || '*'

-> (require, async)foreign

```js
{
  'a': {
    '*': {
      dependencies: {
        'b': '*'
      },
      asyncDependencies: {
        'c': '*'
      } 
    }
  },

  'c': {
    '*': {}
  },

  'b': {
    '*': {}
  }
}
```

## License

MIT



