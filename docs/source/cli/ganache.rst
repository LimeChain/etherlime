etherlime ganache
*****************

::

    etherlime ganache [port] [output]

Parameters:

* ``port`` - [Optional] By specifying ``--port`` you can specify port to run the etherlime ganache. Default: 8545
* ``output`` - [Optional] Defines the way that the logs are shown. Choices: ``none`` - silences the output of logs, ``normal`` - see verbose logs in the console and ``structured`` - structured output in a file meant for inter program communication.


For easier integration and usage of ``EtherlimeGanacheDeployer`` and running local deployments you can use the embedded ganache-cli. It comes with fixed 10 accounts and a lot of ETH (191408831393027885698 to be precise)

