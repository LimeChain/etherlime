etherlime deploy
****************

Syntax
------

::

    etherlime deploy [file] [network] [secret] [-s] [compile] [runs] [output]

Parameters:

* ``file`` - [Optional] By specifying ``--file`` you can use another file as long as you keep the structure of the file (exporting an ``async deploy`` function with ``network`` and ``secret`` params)
* ``network`` - [Optional] By specifying ``--network`` you can specify the network param to be passed to your deploy method
* ``secret`` - [Optional] By specifying ``secret`` you can specify the secret param to be passed to your deploy method. Comes in very handy for passing private keys.
* ``-s`` - [Optional] Silent - silences the verbose errors 
* ``compile`` - [Optional] Enable compilation of the smart contracts before their deployment. By default the deployment is done with a compilation
* ``runs`` - [Optional] Enables the optimizer and runs it the specified number of times
* ``output`` - [Optional] Defines the way that the logs are shown. Choices: ``none`` - silences the output of logs, ``normal`` - see verbose logs in the console and ``structured`` - structured output in a file meant for inter program communication.

Running this command will deploy the file specified (defaults to ``./deployment/deploy.js``)
The deployment process is verbose and gives you real-time info about the
performed actions. In addition there is a report of the actions when the
deployment finishes (as not all of us monitor the deployment process
constantly):

|Deployment result|

-----

.. |Deployment result| image:: ../_docs_static/DeploymentResult.png
   :target: ../_images/DeploymentResult.png