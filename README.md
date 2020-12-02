# Hash Parser
Tiny javascript library to get and set (encoded) hash parameters

![npm version (scoped)](https://img.shields.io/npm/v/@rvanbaalen/hashparser.svg?style=popout-square) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@rvanbaalen/hashparser.svg?style=popout-square)

## Usage

Make sure you have included dist/hashparser.js somewhere in your code.

### `HashParser.setParameter(key, value, encode)`
By default, parameter encoding is turned off.

> Example URL: https://example.com

```
HashParser.setParameter('baz', 'bar');
```

> Result URL: https://example.com#!baz=bar

## Encoding parameter values to store any type of data in the hash

```
var greeting = {
  "hello": "world!"
};

HashParser.setParameter('greeting', greeting, true);
```

> Result URL: https://example.com#!greeting=eyJoZWxsbyI6IndvcmxkISJ9

## Retrieving encoded parameters from the hash
### `HashParser.getParameter(key, decode)`
By default, parameter decoding is turned off.
Returns `null` when parameter does not exist.

```
var greeting = HashParser.getParameter('greeting', true);

// var greeting = {
//   "hello": "world!"
// };
```

> Make sure to set decoding to true when working with encoded parameters or the raw value will be returned instead of the decoded object.
