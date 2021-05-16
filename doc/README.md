# Introduction

[![npm version](https://badge.fury.io/js/etherlime.svg)](https://badge.fury.io/js/etherlime) [![travis build status](https://img.shields.io/travis/LimeChain/etherlime/master.svg)](https://travis-ci.org/LimeChain/etherlime) [![code coverage status](https://img.shields.io/codecov/c/github/LimeChain/etherlime/master.svg)](https://codecov.io/gh/LimeChain/etherlime) [![Gitter chat](https://badges.gitter.im/lime-tech-talks/Lobby.png)](https://gitter.im/lime-tech-talks/Lobby)

## [OBSOLETE]etherlime

**etherlime** is an ethereum development and deployment framework based on [ethers.js](https://github.com/ethers-io/ethers.js/).

This framework provides alternative to the other web3.js based frameworks and allows for ultimate control by the developer. It also adds much needed verboseness in the deployment process so that you can be aware of what is really going on \(as opposed to the general shooting in the dark technique\).

This framework was born out of necessity, hardships and trouble in the development and deployment of ethereum smart contract. We are trying to ease the pain of deployment, compilation and unit testing and add much needed stability to the process. In our mind ethers is much more stable alternative than web3.js for the moment therefore this framework is born.

**Milestones:**

* \[Ready\] Being able to deploy compiled contracts \(compiled in the truffle format\) on local and infura nodes &lt;---- Done
* \[Ready\] Being able to compile contracts to the desired formats for deployment &lt;---- Done
* \[Ready\] Being able to run unit tests on the compiled contracts &lt;---- Done
* \[Ready\] Being able to run unit tests with code coverage &lt;---- Done
* \[Ready\] Being able to debug transactions &lt;---- Done
* \[Ready\] Being able to verify contracts &lt;---- Done

### Installing

```text
npm i -g etherlime
```

### Documentation

[Documentation](developer-documentation/getting-started.md)

### Contribution

We are always open to new fresh ideas, so you are welcome if you want to contribute to this project. To set it up, follow the steps:

```text
git clone https://github.com/LimeChain/etherlime.git
npm install
npm run link
```

As Etherlime is a monorepo the last command will bootstrap the packages, install their dependencies and link any cross-dependencies. It will also create a symlink of etherlime (cli commands) package so you can test new changes locally. If you want ot work on any other package, just navigate to its folder and run `yarn link`.

The package `etherlime-lib` is written in TypeScript thus the code must be compiled to JavaScript. Run the following commands:

```text
cd packages/etherlime-lib
npm run tsc
cd ../..
```

Please, commit all your new changes in a new branch and create a pull request. All of the new code must have 100 % test coverage. To see the test coverage table result, run:

```text
npm test
``` 


### Community

[Join our community group](https://t.me/etherlime/)

## License

Completely MIT Licensed. Including ALL dependencies.

