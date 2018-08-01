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
You can use this file to write your deployment procedure.

Deployment
----------

Deploying
~~~~~~~~~
::

    etherlime deploy [file] [network] [secret] [-s]

Parameters:

* ``file`` - [Optional] By specifying ``--file`` you can use another file as long as you keep the structure of the file (exporting an ``async deploy`` function with ``network`` and ``secret`` params)
* ``network`` - [Optional] By specifying ``--network`` you can specify the network param to be passed to your deploy method
* ``secret`` - [Optional] By specifying ``secret`` you can specify the secret param to be passed to your deploy method. Comes in very handy for passing private keys.
* ``-s`` - [Optional] Silent - silences the verbose errors 

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

    etherlime compile [dir] [runs]

Parameters:

* ``dir`` - [Optional] By specifying ``dir`` you can set the root directory where to read the contracts and place the build folder. By default ``dir`` is set to the current working directory ``./``
* ``runs`` - [Optional] By specifying ``runs`` between 1 and 999 you enabled the optimizer and set how many times the optimizer will be run. By default the optimizer is not enabled.

Here is example of result:

|Compilation result|

Testing
-------

::

    etherlime test [path]

Parameters:

* ``path`` - [Optional] By specifying ``path`` you can set a path to a selected directory or you can set the path directly to the javascript file which contains your tests. By default the ``path`` points to ``./test``.

-----

.. |Deployment result| image:: ./_docs_static/DeploymentResult.png
   :target: ./_images/DeploymentResult.png
.. |Compilation result| image:: ./_docs_static/CompilationResult.png
   :target: ./_images/CompilationResult.png
   :width: 500