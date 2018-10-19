etherlime compile
*****************

Syntax
------

::

    etherlime compile [dir] [runs] [solcVersion] [docker] [list] [all] [quite] [output]

Parameters:

* ``dir`` - [Optional] By specifying ``dir`` you can set the root directory where to read the contracts and place the build folder. By default ``dir`` is set to the current working directory ``./``
* ``runs`` - [Optional] By specifying ``runs`` between 1 and 999 you enabled the optimizer and set how many times the optimizer will be run. By default the optimizer is not enabled.
* ``solcVersion`` - [Optional] By specifying ``solcVersion`` you can set the version of the solc which will be used for compiling the smart contracts. By default it use the solc version from the node_modules folder.
* ``docker`` - [Optional] When you want to use a docker image for your solc you should set ``docker=true`` in order ``solcVersion`` to accept the passed image.
* ``list`` - [Optional] By specifying ``list`` you can list the available solc versions. The following values can be used: ``docker``, ``releases``, ``prereleases`` and ``latestRelease``. By default only 10 version are listed
* ``all`` - [Optional] By specifying ``all`` together with ``list`` you will be able to list all available solc versions.
* ``quite`` - [Optional] Disable verboseness during compilation. By the default ``quite`` is set to false.
* ``output`` - [Optional] Defines the way that the logs are shown. Choices: ``none`` - silences the output of logs, ``normal`` - see verbose logs in the console and ``structured`` - structured output in a file meant for inter program communication.

The ``solcVersion`` can accept the following values:

* <undefined> - passing undefined or simply don't using the solcVersion argument will use the solc version from the local node_modules
* <version> - you can pass directly the version of the solc. Example: ``--solcVersion=0.4.24``
* <image> - the image which will be used to load the solc into the docker. Example: ``nightly-0.4.25-a2c754b3fed422b3d8027a5298624bcfed3744a5``
* <path> - you can pass the absolute path to a local solc
* <native> - when you set the solc version argument to ``native`` the compiler is using the solc globally installed on your machine

Here is example of result:

|Compilation result|

-----

.. |Compilation result| image:: ../_docs_static/CompilationResult.png
   :target: ../_images/CompilationResult.png
   :width: 500