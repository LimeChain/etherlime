scrypt-async
============

[![Build Status](https://travis-ci.org/dchest/scrypt-async-js.svg?branch=master)](https://travis-ci.org/dchest/scrypt-async-js)
[![Coverage Status](https://coveralls.io/repos/dchest/scrypt-async-js/badge.svg)](https://coveralls.io/r/dchest/scrypt-async-js)

[![Saucelabs Test Status](https://saucelabs.com/browser-matrix/scrypt.svg)](https://saucelabs.com/u/scrypt)

Fast "async" scrypt implementation in JavaScript.

Works in browsers without throwing "kill slow script" warnings due to
configurable interruptStep, which yields from calculation. Compatible even with
old versions of IE. Also works with Node.js (but you should really use the C
implementation for that).


Installation
------------

You can install it via a package manager:

[Yarn](https://yarnpkg.com/):

    $ yarn add scrypt-async

[NPM](https://www.npmjs.org/):

    $ npm install scrypt-async

[Bower](http://bower.io):

    $ bower install scrypt-async

or [download source code](https://github.com/dchest/scrypt-async-js/releases).

To improve performance with small interruptStep values, use `setImmediate` shim,
such as <https://github.com/YuzuJS/setImmediate>.


Usage
-----

### Modern API

#### scrypt(password, salt, options, callback)

Derives a key from password and salt and calls callback
with derived key as the only argument.

If interruptStep is set, calculations are interrupted with setImmediate (or
zero setTimeout) at the given interruptSteps to avoid freezing the browser.
If it's not set or set to zero, the callback is called immediately after the
calculation, avoiding setImmediate.

#### Arguments:

* *password* — password (`string` or `Array` of bytes or `Uint8Array`)
* *salt* — salt (`string` or `Array` of bytes or `Uint8Array`)
* *options* — object with key derivation options
* *callback* — callback function receiving result (`function (Array|Uint8Array|string)`)

##### Options:

* `N` — CPU/memory cost parameter (must be power of two;
  alternatively, you can specify `logN` where *N = 2^logN*).
* `r` — block size parameter
* `p` — parallelization parameter (default is 1)
* `dkLen` — derived key length (default is 32)
* `interruptStep` — (optional) steps to split calculation with timeouts (defaults to 0)
* `encoding` — (optional) result encoding `'base64'` or `'hex'` (result with be a `string`), `'binary'` (result will be a `Uint8Array`) or undefined (result will be an `Array` of bytes).

#### Example:

```javascript
scrypt('mypassword', 'saltysalt', {
    N: 16384,
    r: 8,
    p: 1,
    dkLen: 16,
    encoding: 'hex'
}, function(derivedKey) {
    console.log(derivedKey); // "5012b74fca8ec8a4a0a62ffdeeee959d"
});
```

### Legacy API (deprecated)

#### scrypt(password, salt, logN, r, dkLen, [interruptStep], callback, [encoding])

Legacy API doesn't support parallelization parameter greater than 1.

##### Arguments:

* *password* — password (`string` or `Array` of bytes or `Uint8Array`)
* *salt* — salt (`string` or `Array` of bytes or `Uint8Array`)
* *logN* — CPU/memory cost parameter (1 to 31)
* *r* — block size parameter
* *dkLen* — length of derived key
* *interruptStep* — (optional) steps to split calculation with timeouts (defaults to 1000)
* *callback* — callback function receiving result (`function (Array|Uint8Array|string)`)
* *encoding* — (optional) result encoding (`'base64'`, `'hex'`, `'binary'` or undefined).

When encoding is not set, the result is an `Array` of bytes.


License
-------

BSD-like, see LICENSE file or MIT license at your choice.
