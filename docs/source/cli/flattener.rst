Flattener
******

Syntax
------

::
    etherlime flatten [file] [solcVersion]


Parameters:

* ``file`` - The name of the contract form "./contract" folder that you want to be flattened.
* ``solcVersion`` - [Optional] By specifying ``solcVersion`` you can set the version of the solc which will be used for compiling the smart contracts. By default it use the solc version from the node_modules folder.

Running this command will flatten the given smart contract and will record all Solidity code in one file along with imported sources. It will create "./flat" folder where you can find the flattened contract.