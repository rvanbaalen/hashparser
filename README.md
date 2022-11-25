# HashParser v2.0

Tiny javascript library to get and set (encoded) query parameters in the URL hash.

![npm (scoped)](https://img.shields.io/npm/v/@rvanbaalen/hashparser?style=flat-square)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@rvanbaalen/hashparser?style=flat-square)
![downloads](https://img.shields.io/npm/dt/@rvanbaalen/hashparser.svg?style=flat-square)

⚠️ v2.* is a complete rewrite from version 1.0 and not backwards compatible.

# Installation

```bash
npm install @rvanbaalen/hashparser
```

### Before your get started

ℹ️ **Important note: HashParser assumes that everything after the hash is a query string.**

HashParser uses `URLSearchParams` to parse and set the query parameters.

## Basic usage

```js
import {HashParser} from '@rvanbaalen/hashparser';

const hp = new HashParser();

// Set a paramter in the hash
hp.set('foo', 'bar'); // example.com#foo=bar

// Get a parameter from the hash
hp.get('foo'); // bar

// Remove a parameter from the hash
hp.remove('foo'); // example.com#

```

## Encoded values

```js
import {HashParser} from '@rvanbaalen/hashparser';

// Two ways to use encoded parameters

// 1. Via the static getter

// Set a paramter in the hash
HashParser.encoded.set('foo', 'bar'); // example.com#foo=ImJhciI%3D

// Get a parameter from the hash
HashParser.encoded.get('foo'); // "bar"

// For reference, a default HashParser instance does not decode values
const hp = new HashParser();
hp.get('foo'); // ImJhciI%3D

// 2. Via the instance
const hp = new HashParser({encoded: true});

hp.set('foo', 'bar'); // example.com#foo=ImJhciI%3D
hp.get('foo'); // "bar"
```

## Options

The following options can be passed to a new HashParser instance:

```js
{
  encoded: false, // default value is false, set to true to always encode values
  sync: true // default value is true, this will listen for hashchange events on the window object and update the internal dataset.
}
```

### Building

Compile the source files to the `dist` folder:

```bash
npm run build
```

Upon each commit, `npm run build` is automatically 
executed and `./dist/hashparser.min.js` is automatically added pre-commit.
