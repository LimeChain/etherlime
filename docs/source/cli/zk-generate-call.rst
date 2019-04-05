etherlime zk call
*****************

Syntax
------

::

    etherlime zk call [publicSignals] [proof]

Parameters:

* ``publicSignals`` - [Optional] Specifies the file with signals to be used for generating verifying a proof. Defaults to ``circuit_public_signals.json`` read from ``zero-knowledge-proof/generated-proof`` folder.
* ``proof`` - [Optional] Specifies the compiled proof that would be used for generating a proof based on it. Defaults to: ``circuit_proof.json`` read from ``zero-knowledge-proof/generated-proof`` folder.


Running this command will generates a call based on proof and public signals. A new folder ``generated-call`` is generated with ``generatedCall.json`` file. This generated call can be used for on-chain verification. The parameter ``generatedCall`` can be used for calling public view method ``verifyProof`` of the generated verifier contract.
