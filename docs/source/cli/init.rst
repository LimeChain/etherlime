etherlime init
**************

Syntax
------

::

    etherlime init [output] [zk]

Parameters:

* ``output`` - [Optional] Defines the way that the logs are shown. Choices: ``none`` - silences the output of logs, ``normal`` - see verbose logs in the console and ``structured`` - structured output in a file meant for inter program communication.
* ``zk`` - [Optional] Defines whether to include in project a zk-proof folder with primary ready to use circuit for compiling. Defaults to ``false``.


Running this command will install ``etherlime`` in the directory you've run it and will create ``deployment`` directory with ``deploy.js`` prepared for you to use.
You can use this file to write your deployment procedure. It also create ``test`` directory where you can write your tests. It comes with an ``exampleTest.js`` file which you can use as a start point. The init command generate and ``package.json`` for you which you can use for your npm modules.
