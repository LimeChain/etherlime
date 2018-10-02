
Etherlime CLI Commands
**********************

Installing
----------

::

    npm i -g etherlime

Install the global etherlime to allow you to run ``etherlime`` commands.

Help
----------------------------

::

    etherlime help

Run this command to give you all possible commands of ``etherlime`` + help info

Version
----------------------------

::

    etherlime --version

Running this command will give you the current installed ``etherlime`` version

Running embedded ganache-cli
----------------------------

::

    etherlime ganache [port]

Parameters:

* ``port`` - [Optional] By specifying ``--port`` you can specify port to run the etherlime ganache. Default: 8545

For easier integration and usage of ``EtherlimeGanacheDeployer`` and running local deployments you can use the embedded ganache-cli. It comes with fixed 10 accounts and a lot of ETH (191408831393027885698 to be precise)

Project Initialization
----------------------
::

    etherlime init

Running this command will install ``etherlime`` in the directory you've run it and will create ``deployment`` directory with ``deploy.js`` prepared for you to use.
You can use this file to write your deployment procedure. It also create ``test`` directory where you can write your tests. It comes with an ``exampleTest.js`` file which you can use as a start point. The init command generate and ``package.json`` for you which you can use for your npm modules.

Deployment
----------

Deploying
~~~~~~~~~
::

    etherlime deploy [file] [network] [secret] [-s] [compile] [runs] [output]

Parameters:

* ``file`` - [Optional] By specifying ``--file`` you can use another file as long as you keep the structure of the file (exporting an ``async deploy`` function with ``network`` and ``secret`` params)
* ``network`` - [Optional] By specifying ``--network`` you can specify the network param to be passed to your deploy method
* ``secret`` - [Optional] By specifying ``secret`` you can specify the secret param to be passed to your deploy method. Comes in very handy for passing private keys.
* ``-s`` - [Optional] Silent - silences the verbose errors 
* ``compile`` - [Optional] Enable compilation of the smart contracts before their deployment. By default the deployment is done with a compilation
* ``runs`` - [Optional] Enables the optimizer and runs it the specified number of times
* ``output`` - [Optional] Defines the way that the logs are shown. Choices: ``none``, ``normal`` and ``structured``.

Running this command will deploy the file specified (defaults to ``./deployment/deploy.js``)
The deployment process is verbose and gives you real-time info about the
performed actions. In addition there is a report of the actions when the
deployment finishes (as not all of us monitor the deployment process
constantly):

|Deployment result|

Deployment History
~~~~~~~~~~~~~~~~~~

::

    etherlime history [limit]

Parameters:

* ``limit`` - [Optional] By specifying ``-limit`` you can set the max number of historical records to be shown. Default is 5.

Using this command will print you historical list of execution reports

Compiling
---------

::

    etherlime compile [dir] [runs] [solcVersion] [docker] [list] [all] [quite]

Parameters:

* ``dir`` - [Optional] By specifying ``dir`` you can set the root directory where to read the contracts and place the build folder. By default ``dir`` is set to the current working directory ``./``
* ``runs`` - [Optional] By specifying ``runs`` between 1 and 999 you enabled the optimizer and set how many times the optimizer will be run. By default the optimizer is not enabled.
* ``solcVersion`` - [Optional] By specifying ``solcVersion`` you can set the version of the solc which will be used for compiling the smart contracts. By default it use the solc version from the node_modules folder.
* ``docker`` - [Optional] When you want to use a docker image for your solc you should set ``docker=true`` in order ``solcVersion`` to accept the passed image.
* ``list`` - [Optional] By specifying ``list`` you can list the available solc versions. The following values can be used: ``docker``, ``releases``, ``prereleases`` and ``latestRelease``. By default only 10 version are listed
* ``all`` - [Optional] By specifying ``all`` together with ``list`` you will be able to list all available solc versions.
* ``quite`` - [Optional] Disable verboseness during compilation. By the default ``quite`` is set to false.

The ``solcVersion`` can accept the following values:

* <undefined> - passing undefined or simply don't using the solcVersion argument will use the solc version from the local node_modules
* <version> - you can pass directly the version of the solc. Example: ``--solcVersion=0.4.24``
* <image> - the image which will be used to load the solc into the docker. Example: ``nightly-0.4.25-a2c754b3fed422b3d8027a5298624bcfed3744a5``
* <path> - you can pass the absolute path to a local solc
* <native> - when you set the solc version argument to ``native`` the compiler is using the solc globally installed on your machine

Here is example of result:

|Compilation result|

Testing
-------

::

    etherlime test [path] [skip-compilation]

Parameters:

* ``path`` - [Optional] By specifying ``path`` you can set a path to a selected directory or you can set the path directly to the javascript file which contains your tests. By default the ``path`` points to ``./test``.
* ``skip-compilation`` - [Optional] This parameter controls wether a compilation will be ran before the tests are started. Default: false.

We've augmented the test runner with the following things you can use:

* In your unit tests you can use the global ``accounts`` object. It contains the secretKey (private key) and instance of ethers.Wallet of the account.
* The assert object has ``assert.revert(promiseOfFailingTransaction)`` function for testing reverting transactions

* There is a global utils object. Holding the following util methods:
	*  ``timeTravel(provider, seconds)`` method allowing etherlime ganache to move ``seconds`` ahead. You need to pass your provider from the EtherlimeGanacheDeployer
	* ``setTimeTo(provider, timestamp)`` method allowing etherlime ganache to move to the desired ``timestamp`` ahead. You need to pass your provider from the EtherlimeGanacheDeployer
	*  ``snapshot(provider)`` method allowing etherlime ganache to take a **Snapshot** of the current Blockchain data. You can revert back to this snapshot when desired. You need to pass your provider from the EtherlimeGanacheDeployer
	*  ``revertState(provider)`` method allowing etherlime ganache to **revert** back to the most recent snapshot. In case you don't have a snapshot it will reset the entire chain data. You need to pass your provider from the EtherlimeGanacheDeployer
	* ``mineBlock(provider)`` method telling the etherlime ganache to mine the next block. You need to pass your provider from the EtherlimeGanacheDeployer
	* ``hasEvent(tx, eventName)`` allowing the user to check if the desired event was broadcasted in the transaction. You need to pass the T ransaction and the Name of the Event.
	* ``eventValue(tx, eventName, parName)`` allowing the user to check if the desired event exists in the transaction. You need to pass the Transaction, Name of the Event and optionally Parameter Name.

Coverage
--------

::

    etherlime coverage [path] [port] [runs]

Parameters:

* ``path`` - [Optional] By specifying ``path`` you can set a path to a selected directory or you can set the path directly to the javascript file which contains your tests. By default the ``path`` points to ``./test``.
* ``port`` - [Optional] The port to run the solidity coverage testrpc (compatible with etherlime ganache deployer). Default: 8545.
* ``runs`` - [Optional] By specifying number runs you can enable the optimizer of the compiler with the provided number of optimization runs to be executed. Compilation is always performed by solidity coverage.

-----

.. |Deployment result| image:: ./_docs_static/DeploymentResult.png
   :target: ./_images/DeploymentResult.png
.. |Compilation result| image:: ./_docs_static/CompilationResult.png
   :target: ./_images/CompilationResult.png
   :width: 500