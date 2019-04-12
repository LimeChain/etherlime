etherlime coverage
******************

Syntax
------

::

    etherlime coverage [path] [timeout] [port] [runs] [solcVersion] [buildDirectory] [workingDirectory] [shouldOpenCoverage]

Parameters:

* ``path`` - [Optional] By specifying ``path`` you can set a path to a selected directory or you can set the path directly to the javascript file which contains your tests. By default the ``path`` points to ``./test``.
* ``timeout`` - [Optional] This parameter defines the test timeout in milliseconds. Defaults to 2000 ms.
* ``port`` - [Optional] The port to run the solidity coverage testrpc (compatible with etherlime ganache deployer). Default: 8545.
* ``runs`` - [Optional] By specifying number runs you can enable the optimizer of the compiler with the provided number of optimization runs to be executed. Compilation is always performed by solidity coverage.
* ``solcVersion`` - [Optional] By specifying ``solcVersion`` you can choose a specific solc version to be used for compilation and coverage reports.
* ``buildDirectory`` - [Optional] By specifying ``buildDirectory`` you can choose which folder to use for reading builded contracts from, instead of the default one: ``./build``.
* ``workingDirectory`` - [Optional] By specifying ``workingDirectory`` you can choose which folder to use for reading contracts from, instead of the default one: ``./contracts``.
* ``html`` - [Optional] By specifying ``html`` you can choose either to open automatically with you default browser the html coverage report located in: ``./coverage``. Defaults to ``false``.



    