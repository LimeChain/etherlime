# Change Log

## [1.1.0](https://github.com/rmdm/assert-match/compare/v1.0.3...v1.1.0)
- `contains` now accepts multiple **expected** values
- `primitive` now accepts other matchers
- `primitive` generates more consistent error descriptions
- `every` generates less verbose error descriptions with only failed checks
- fix bug with not matching `assert.deepEqual([], loose({ length: 0 }))`

## [1.0.3](https://github.com/rmdm/assert-match/compare/v1.0.0...v1.0.3)
- fix recursive traverse bug
- more actual core `assert` tests

## [1.0.0](https://github.com/rmdm/assert-match/compare/v0.1.1...v1.0.0)
- `match`-family assertions removed.
- Exports standard compatible variation of `assert`.
- Matchers introduced.
- Family of `deep` assertions of exported `assert`-like object are
matchers-aware.

## 0.1.1 - 2017-03-28
- `match`-family assertions.
- Exports function, extending passed object with `match` assertions.
