etherlime zk-generate-verifier
*****************

Syntax
------

::

    etherlime zk-generate-verifier [verifier_key]

Parameters:

* ``verifier_key`` - [Optional] Specifies the verifier key to be used for generating a verifier smart contract. Defaults to: circuit_verification_key.json read from ``zero-knowledge-proof/generated-proof`` folder.


Generates a verifier smart contract based on verification key which can be used for on-chain verification. The smart contract is written in contracts folder and it is ready to be compiled and deployed with ``etherlime compile`` and ``etherlime deploy``.
The verifier smart contract has a public view method ``verifyProof`` that can be called for on-chain verification. You can generate the call parameters with ``etherlime zk-generate-call`` cli command.
