etherlime coverage
******************

Syntax
------

::

    etherlime coverage [path] [port] [runs]

Parameters:

* ``path`` - [Optional] By specifying ``path`` you can set a path to a selected directory or you can set the path directly to the javascript file which contains your tests. By default the ``path`` points to ``./test``.
* ``port`` - [Optional] The port to run the solidity coverage testrpc (compatible with etherlime ganache deployer). Default: 8545.
* ``runs`` - [Optional] By specifying number runs you can enable the optimizer of the compiler with the provided number of optimization runs to be executed. Compilation is always performed by solidity coverage.
    