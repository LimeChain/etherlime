etherlime ganache
*****************

Syntax
------

::

    etherlime ganache [port] [output] [fork] [gasPrice] [gasLimit]

Parameters:

* ``port`` - [Optional] By specifying ``--port`` you can specify port to run the etherlime ganache. Default: 8545
* ``output`` - [Optional] Defines the way that the logs are shown. Choices: ``none`` - silences the output of logs, ``normal`` - see verbose logs in the console and ``structured`` - structured output in a file meant for inter program communication.
* ``fork`` - [Optional] By specifying ``--fork`` you can fork from another currently running Ethereum network at a given block or at a last current block. The input to the optional parameter should be the HTTP location and port of the running network, e.g http://localhost:8545 and in addition you can specify a block number to fork from, using an ``@`` sign: http://localhost:8545@3349038
* ``gasPrice`` - [Optional] By specifying ``--gasPrice`` you can specify the default gas price for transactions. Default: 2000000000 wei (2 Gwei)
* ``gasLimit`` - [Optional] By specifying ``--gasLimit`` you can specify the default block gas limit. Default: 6721975





For easier integration and usage of ``EtherlimeGanacheDeployer`` and running local deployments you can use the embedded ganache-cli. It comes with fixed 10 accounts and a lot of ETH (191408831393027885698 to be precise)

