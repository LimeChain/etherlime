# nodeify-ts
Create functions that both return promises and accept node-style callbacks

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Gitter][gitter-image]][gitter-url]

## Installation

    npm install nodeify-ts
    
## Usage

### Javascript

```js
var nodeify = require('nodeify-ts');

var command = function (command, callback) {
    var promise = Promise.resolve().then(function () {
        return Promise.resolve('do some work and return result ' + command);
    }).then(function (data) {
        return data;
    });
    return nodeify(promise, callback);
};
```

### Typescript

```js
import nodeify from 'nodeify-ts';

const command = function (command: string, callback?: (err, data) => void): Promise<any> {

  const promise = Promise.resolve().then(function () {
    return Promise.resolve('do some work and return result ' + command);
  }).then(function (data) {
    return data;
  });

  return nodeify(promise, callback);
};
```


## License

MIT

[npm-image]: https://img.shields.io/npm/v/nodeify-ts.svg?style=flat
[npm-url]: https://npmjs.org/package/nodeify-ts
[downloads-image]: https://img.shields.io/npm/dm/nodeify-ts.svg?style=flat
[downloads-url]: https://npmjs.org/package/nodeify-ts
[travis-image]: https://api.travis-ci.org/Quobject/nodeify-ts.svg
[travis-url]: https://travis-ci.org/Quobject/nodeify-ts/
[gitter-image]: https://badges.gitter.im/Quobject/nodeify-ts.svg
[gitter-url]: https://gitter.im/Quobject/nodeify-ts?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge