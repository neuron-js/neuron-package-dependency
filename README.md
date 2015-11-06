[![NPM version](https://badge.fury.io/js/neuron-package-dependency.svg)](http://badge.fury.io/js/neuron-package-dependency)
[![npm module downloads per month](http://img.shields.io/npm/dm/neuron-package-dependency.svg)](https://www.npmjs.org/package/neuron-package-dependency)
[![Build Status](https://travis-ci.org/neuron-js/neuron-package-dependency.svg?branch=master)](https://travis-ci.org/neuron-js/neuron-package-dependency)
[![Dependency Status](https://david-dm.org/neuron-js/neuron-package-dependency.svg)](https://david-dm.org/neuron-js/neuron-package-dependency)

# neuron-package-dependency

<!-- description -->
Resolve module depdendencies from a Neuron-JSON object.

## Install

```sh
$ npm i -g neuron-package-dependency
```

## Usage

```sh
neuron-package-dependency [--cwd <path>] --output <filename>
```

## Example

it would return an object of dependency tree:

```javascript
  {
    <module_name>:
    {
      <module_version>:
      {
        "dependencies": { // required modules
          <module_id> : <module_version>,
          ...
        },
        "asyncDependencies":{ // async required modules
          <module_id> : <module_version>,
          ...
        }
      }
    },
    <foreign_module_name>: {
      <foreign_module_version>: {}
    },
    ...
  };
```


## License

MIT
