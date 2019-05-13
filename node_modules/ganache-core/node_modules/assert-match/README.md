[![Build Status](https://travis-ci.org/rmdm/assert-match.svg?branch=master)](https://travis-ci.org/rmdm/assert-match)
[![Coverage Status](https://coveralls.io/repos/github/rmdm/assert-match/badge.svg?branch=master)](https://coveralls.io/github/rmdm/assert-match?branch=master)

assert-match
===============

`assert-match` is the enhancement of the standard `assert` module with matchers.

Short example
=============

```javascript
import assert from 'assert-match'
import { loose, arrayOf, type } from 'assert-match/matchers'
// or const { loose, arrayOf, type } = assert.matchers

const actual = {
        str: 'abc',
        obj: { b: 1, c: 2 },
        nums: [ 1, 2, 'x' ],
    },
    expected = {
        str: 'abc',
        obj: loose({ b: 1 }),
        nums: arrayOf(type('number')),
    }

assert.deepEqual(actual, expected)

//  AssertionError: { str: 'abc', obj: { b: 1 }, nums: [ 1, 2, 'x' ] } deepEqual
//  { str: 'abc',  obj: { b: 1 }, nums: [ 1, 2, { '[typeof]': 'number' } ] }
//        + expected - actual
//
//         {
//           "nums": [
//             1
//             2
//        -    "x"
//        +    {
//        +      "[typeof]": "number"
//        +    }
//           ]

```

Installation
============

```sh
    npm install assert-match
```

Usage
=====

Use `assert-match` in all the same places where you would use built-in `assert`:

```javascript
const assert = require('assert-match')

// ...

assert.deepEqual(actual, expected)
```

Assertions
----------

`assert-match` enhances standard `assert`'s `deep`-family assertions:

- ```assert.deepEqual (actual, expected, [message])```
- ```assert.deepStrictEqual (actual, expected, [message])```
- ```assert.notDeepEqual (actual, expected, [message])```
- ```assert.notDeepStrictEqual (actual, expected, [message])```

`assert-match` allows you to check **actual** value (or its property) not
against a specific **expected** value as standard `deep` assertions do, but
against a matcher or a combination of them.
Without using matchers these assertions behave exactly like their standard
counterparts which [has been tested](test/core/test-assert.spec.js) against the
same set of tests as the standard ones.

Other assertions of `assert` are also exported by `assert-match` but not
enhanced with matchers support.

Matchers
--------

A matcher is an objects used to check if a value satisfies some requirements
defined by the matcher.

Matchers can be placed on the top level of **expected** value or on some of its
properties.

An awesome point about matchers is the ability to combine them! It gives you a
way to create powerful matching structures using small set of matchers.

Matchers and combinations of them can be reused and recombined across multiple
assertions.

In cases of assertion errors matchers participate in providing your test runner
with error details.

`assert-match` defines the following matchers:

- [strict (expected)](#strict-expected)
- [loose (expected)](#loose-expected)
- [any (expected)](#any-expected)
- [not (expected)](#not-expected)
- [every (expected)](#every-expected)
- [some (expected)](#some-expected)
- [arrayOf (expected)](#arrayof-expected)
- [contains (expected)](#contains-expected1-expected2)
- [type (expected)](#type-expected)
- [primitive (expected)](#primitive-expected)
- [regex (expected)](#regex-expected)
- [gt (expected)](#gt-expected)
- [gte (expected)](#gte-expected)
- [lt (expected)](#lt-expected)
- [lte (expected)](#lte-expected)
- [custom (expectedFn)](#custom-expectedfn)

In all of the following matchers descriptions **actual** refers to **actual**
value or its property, corresponding to the matcher in **expected**, both passed
to an assertion.

### `strict (expected)`

Returns an instance of the root matchers class. All other matchers inherit from
that class. It checks whether two values are equal in depth. Actual comparison
operator (== or ===) for primitives depends on assertion in which this matcher
is used (for example, == is used for `deepEqual` whereas === is used for
`deepStrictEqual`). If **expected** contains a matcher somewhere on it, then
check for corresponding **actual** value is passed to that matcher.
If applied to another matcher it produces equivalent one, meaning that for
example `strict(aMatcher(expected))` returns matcher equivalent to
`aMatcher(expected)`. Actually, `deepEqual` and `deepStrictEqual` assertions
wrap its **expected** argument in `strict` matcher implicitly.

```javascript
assert.deepEqual({ a: 1, b: 2 }, strict({ a: 1, b: 2 }))   // passes
assert.deepEqual({ a: 1, b: 2 }, strict({ a: 1 }))         // throws
assert.deepEqual({ a: 1 }, strict({ a: 1, b: 2 }))         // throws
```

### `loose (expected)`

Similar to `strict` matcher but requires only subset of **actual** properties to
be equal in depth to those of **expected**.

```javascript
assert.deepEqual({ a: 1, b: 2 }, loose({ a: 1, b: 2 }))     // passes
assert.deepEqual({ a: 1, b: 2 }, loose({ a: 1 }))           // passes
assert.deepEqual({ a: 1 }, loose({ a: 1, b: 2 }))           // throws
```

### `any (expected)`

Matches anything. Can be used if value or existence of a specific **actual**
property does not matter. It is supposed to be used in context of `strict`
matcher, in context of `loose` matcher it makes a little sense.

```javascript
assert.deepEqual(undefined, any())                                  // passes
assert.deepEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: any() })    // passes
assert.deepEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 5, c: any() })    // throws
```

### `not (expected)`

It implicitly wraps **expected** in `strict` matcher, matches **actual** value
against it and inverts result. `notDeepEqual` and `notDeepStrictEqual`
assertions wrap its **expected** argument in `not` matcher implicitly.

```javascript
assert.deepEqual({ a: 1, b: 2 }, not({ a: 1, b: 2 }))  // throws
assert.deepEqual({ a: 1, b: 2 }, not({ a: 1 }))        // passes
assert.deepEqual({ a: 1 }, not({ a: 1, b: 2 }))        // passes
```

### `every (expected)`

**expected** should be an array. If it is not, than it is treated as one-element
array. Each element of **expected** array is wrapped implicitly in `strict`
matcher. `every` matcher checks whether **actual** value matches all matchers of
**expected**.

```javascript
assert.deepEqual({ a: 1, b: 2 }, every([ loose({ a: 1 }), loose({ b: 2 }) ]))   // passes
assert.deepEqual({ a: 1, b: 2 }, every([ loose({ a: 1 }), loose({ c: 3 }) ]))   // throws
assert.deepEqual({ a: 1, b: 2 }, every([ { c: 3 } ]))                           // throws
assert.deepEqual({ a: 1, b: 2 }, every(loose({ a: 1 })))                        // passes
```

### `some (expected)`

**expected** should be an array. If it is not, than it is treated as one-element
array. Each element of **expected** array is wrapped implicitly in `strict`
matcher. `some` matcher checks whether **actual** value matches at least one
matcher of **expected**.

```javascript
assert.deepEqual({ a: 1, b: 2 }, some([ loose({ a: 1 }), loose({ b: 2 }) ]))    // passes
assert.deepEqual({ a: 1, b: 2 }, some([ loose({ a: 1 }), loose({ c: 3 }) ]))    // passes
assert.deepEqual({ a: 1, b: 2 }, some([ { c: 3 } ]))                            // throws
assert.deepEqual({ a: 1, b: 2 }, some(loose({ a: 1 })))                         // passes
```

### `arrayOf (expected)`

Expects **actual** value to be a non-empty array, check fails if it is not.
Implicitly wraps **expected** in `strict` matcher. Checks that all elements of
the array match **expected**.

```javascript
assert.deepEqual([ 1, 1, 1 ], arrayOf(1))   // passes
assert.deepEqual([ 1, 1, 'a' ], arrayOf(1)) // throws
assert.deepEqual(1, arrayOf(1))             // throws
```

### `contains (expected1 [, expected2, ...])`

Expects **actual** value to be a non-empty array, check fails if it is not.
Accepts a list of **expected**. Checks that each element of the **expected**
list matches at least one element in the **actual** array.

```javascript
assert.deepEqual([ 1, 1, 1 ], contains(1))       // passes
assert.deepEqual([ 1, 'a', 'a' ], contains(1))   // passes
assert.deepEqual([ 'a', 'a', 'a' ], contains(1)) // throws
assert.deepEqual(1, contains(1))                 // throws
assert.deepEqual([ 1, 2, 3 ], contains(1, 2))    // passes
assert.deepEqual([ 1, 2, 3 ], contains(1, 10))   // throws
```

### `type (expected)`

if **expected** is a string than **actual** is checked to be a primitive of that
type. If **expected** is a constructor than **actual** is checked to be an
instance of that type.

```javascript
assert.deepEqual(5, type('number'))            // passes
assert.deepEqual([ 1, 2, 3 ], type(Array))     // passes
assert.deepEqual(5, type('string'))            // throws
assert.deepEqual({ a: 1 }, type({ a: 1 }))     // throws
```

### `primitive (expected)`

If **expected** is a matcher than **actual** is converted to primitive and
matched against **expected**. Otherwise, **actual** and **expected** both
converted to primitive and compared (actual operator == or === depends on
assertion used).

```javascript
assert.deepEqual({}, primitive('[object Object]'))              // passes
assert.deepEqual(new String('abc'), primitive('abc'))           // passes
assert.deepEqual({ toString: () => 'abc' }, primitive('abc'))   // passes
assert.deepEqual(1, primitive(1))                               // passes
assert.deepEqual(10, primitive(1))                              // throws
assert.deepEqual(1, primitive('1'))                             // passes
assert.deepStrictEqual(1, primitive('1'))                       // throws
assert.deepEqual({}, primitive(regex('obj')))                   // passes
assert.deepEqual({}, primitive(regex('abc')))                   // throws
```

### `regex (expected)`

**expected** is converted to a RegExp and **actual** is tested against it.

```javascript
assert.deepEqual('abc', regex('^a'))               // passes
assert.deepEqual('[object Object]', regex({}))     // passes
assert.deepEqual('123', regex(/^\d+$/))            // passes
assert.deepEqual('123', regex('^\D+$'))            // throws
```

### `gt (expected)`

Checks if **actual** is greater than **expected**.

```javascript
assert.deepEqual('b', gt('a'))                              // passes
assert.deepEqual('a', gt('b'))                              // throws
assert.deepEqual(1, gt(0))                                  // passes
assert.deepEqual(0, gt(0))                                  // throws
assert.deepEqual([ 1, 2, 3 ], loose({ length: gt(1) }))     // passes
assert.deepEqual([ 1 ], loose({ length: gt(1) }))           // throws
```

### `gte (expected)`

Checks if **actual** is greater than or equal to **expected**.

```javascript
assert.deepEqual('b', gte('a'))                             // passes
assert.deepEqual('a', gte('b'))                             // throws
assert.deepEqual(1, gte(0))                                 // passes
assert.deepEqual(0, gte(0))                                 // passes
assert.deepEqual([ 1, 2, 3 ], loose({ length: gte(1) }))    // passes
assert.deepEqual([ 1 ], loose({ length: gte(1) }))          // passes
```

### `lt (expected)`

Checks if **actual** is less than **expected**.

```javascript
assert.deepEqual('a', lt('b'))                              // passes
assert.deepEqual('b', lt('a'))                              // throws
assert.deepEqual(0, lt(1))                                  // passes
assert.deepEqual(0, lt(0))                                  // throws
assert.deepEqual([ 1, 2, 3 ], loose({ length: lt(1) }))     // throws
assert.deepEqual([ 1 ], loose({ length: lt(1) }))           // throws
```

### `lte (expected)`

Checks if **actual** is less than or equal to **expected**.

```javascript
assert.deepEqual('a', lte('b'))                             // passes
assert.deepEqual('b', lte('a'))                             // throws
assert.deepEqual(0, lte(1))                                 // passes
assert.deepEqual(0, lte(0))                                 // passes
assert.deepEqual([ 1, 2, 3 ], loose({ length: lte(1) }))    // throws
assert.deepEqual([ 1 ], loose({ length: lte(1) }))          // passes
```

### `custom (expectedFn)`

If **expectedFn** is not a function than this matcher falls back to `strict`
matcher. An **actual** value is passed to **expectedFn** to check.
**expectedFn** should return either boolean result or an object with
the `match` and `expected` fields. boolean `match` property says whether check
passed and `expected` is used in error reporting. It is possible to return from
custom **expectedFn** results of another matcher.

```javascript
assert.deepEqual({ a: 1 }, custom( actual => actual.a === 1) )      // passes
assert.deepEqual({ a: 1 }, custom( actual => actual.a !== 1) )      // throws
assert.deepEqual({ a: 1 }, custom( actual => ({                     // passes
    match: actual.a === 1,
    expected: 1,
}) ))
assert.deepEqual({ a: 1 }, custom( actual => ({                     // throws
    match: actual.a !== 1,
    expected: '["a" should not be equal to 1]',
}) ))

// return results of another matcher
assert.deepEqual([1, 1, 1], custom(                                 // passes
    (actual, comparator) => arrayOf(gt(0)).match(actual, comparator)
))
assert.deepEqual([1, 1, 'a'], custom(                               // throws
    (actual, comparator) => arrayOf(1).match(actual, comparator)
))
```

FAQ
===

### Why enhancing assert with matchers?

There are cases when you care more not about specific values but rather about
their shapes or features. `assert-match` provides you with a way to achieve that
through matchers.

### Why yet another matchers?

Existing assertion libraries provide you with tons of crazy named matchers and
each new use case requires them (or you) to introduce completely new matcher. On
the other hand `assert-match` provides you with succinct set of combinable
matchers, sufficient to reproduce all the matchers of that libs in a clear way.

### Why does matchers are strict by default?

The more strict your tests the less probability to introduce bugs into your
system and the more probability to detect them. However, as noted above, there
are cases when you care more not about specific values but rather about their
shapes or features. `assert-match` tries to consistently address these two
points.

### What about [`power-assert`](https://github.com/power-assert-js/power-assert)?
[Yes, we have it `>:3`.](https://github.com/rmdm/power-assert-match)

### Why no extension API?

For matchers to be combinable means that not many of them can not be expressed
by existing ones, so this feature would not be in great demand. Additionally,
`custom` matcher may be used for this purpose to some extent. However, you are
always welcome to issues to provide your points why this or any other feature is
required.

Related projects
================
- [power-assert-match](https://github.com/rmdm/power-assert-match)
