|npm version| |travis build status| |coverage status| |Gitter chat|


etherlime
=========

What is etherlime?
------------------

**etherlime** is an ethereum development and deployment framework based
on `ethers.js <https://github.com/ethers-io/ethers.js/>`__.

This framework provides alternative to the other web3.js based
frameworks and allows for ultimate control by the developer. It also
adds much needed verboseness in the deployment process so that you can
be aware of what is really going on (as opposed to the general shooting
in the dark technique).

This framework was born out of necessity, hardships and trouble in the
development and deployment of ethereum smart contracts. We are trying to
ease the pain of deployment, compilation and unit testing and add much
needed stability to the process. In our mind ethers is much more stable
alternative than web3.js for the moment therefore this framework is
born.

Etherlime can be used as library and/or command line tool. The command line tools give you great boosts but you can skip them fully and use plain old node.js including the etherlime library.

Milestones
~~~~~~~~~~~~~~~

* [Ready]Being able to deploy compiled contracts (compiled in the truffle format) on local and infura nodes <---- **Done** 
* [Ready] Being able to compile contracts to the desired formats for deployment <---- **Done**
* [Not Ready] Being able to run unit tests on the compiled contracts <---- **We are here**

.. toctree::
   :maxdepth: 3
   :caption: Developer Documentation

   getting-started
   etherlime-cli
   etherlime-api

-----

License
-------

Completely MIT Licensed. Including ALL dependencies.

.. |npm version| image:: https://badge.fury.io/js/etherlime.svg
   :target: https://badge.fury.io/js/etherlime
.. |travis build status| image:: https://img.shields.io/travis/LimeChain/etherlime/master.svg
   :target: https://travis-ci.org/LimeChain/etherlime
.. |coverage status| image:: https://img.shields.io/codecov/c/github/LimeChain/etherlime/master.svg
   :target: https://codecov.io/gh/LimeChain/etherlime
.. |Gitter chat| image:: https://badges.gitter.im/lime-tech-talks/Lobby.png
   :target: https://gitter.im/lime-tech-talks/Lobby
