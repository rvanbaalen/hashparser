[&larr; See my other Open Source projects](https://robinvanbaalen.nl)

# @rvanbaalen/hashparser
![NPM Downloads](https://img.shields.io/npm/d18m/%40rvanbaalen%2Fhashparser)
![GitHub License](https://img.shields.io/github/license/rvanbaalen/hashparser)
![NPM Version](https://img.shields.io/npm/v/%40rvanbaalen%2Fhashparser)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/rvanbaalen/hashparser/npm-run-tests.yml?label=run%20tests)

## Description

Tiny javascript library to get and set (encoded) query parameters in the URL hash.

## Installation

```bash
npm install @rvanbaalen/hashparser
```

## Usage

### Basic usage

```js
import { HashParser } from '@rvanbaalen/hashparser';

const hp = new HashParser();

// Set a paramter in the hash
hp.set('foo', 'bar'); // example.com#foo=bar

// Get a parameter from the hash
hp.get('foo'); // bar

// Remove a parameter from the hash
hp.remove('foo'); // example.com#

```

### Encoded values

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

### Options

The following options can be passed to a new HashParser instance:

```js
{
  encoded: false, // default value is false, set to true to always encode values
  sync: true // default value is true, this will listen for hashchange events on the window object and update the internal dataset.
}
```

## Building

Compile the source files to the `dist` folder:

```bash
npm run build
```

Upon each commit, `npm run build` is automatically 
executed and `./dist/hashparser.min.js` is automatically added pre-commit.

## Contributing

Contributions are welcome! Please feel free to [open an issue](https://github.com/rvanbaalen/hashparser/issues) or [submit a pull request](https://github.com/rvanbaalen/hashparser/pulls).

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/rvanbaalen/hashparser/blob/main/LICENSE) file for details.
