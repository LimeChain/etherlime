etherlime zk-verify
*****************

Syntax
------

::

    etherlime zk-verify [public_signals] [proof] [verifier_key]

Parameters:

* ``public_signals`` - [Optional] Specifies the file with signals to be used for generating verifying a proof. Defaults to ``circuit_public_signals.json`` read from ``zero-knowledge-proof/generated-proof`` folder.
* ``proof`` - [Optional] Specifies the compiled proof that would be used for generating a proof based on it. Defaults to: ``circuit_proof.json`` read from ``zero-knowledge-proof/generated-proof`` folder.
* ``verifier_key`` - [Optional] Specifies the verifier key to be used for generating a proof. Defaults to: ``circuit_verification_key.json`` read from ``zero-knowledge-proof/trusted-setup`` folder.


Running this command will generates a verifier based on public signals file that comes out of the proof command, the proof itself and verifier key. A new folder ``verified-proof`` is generated with ``output.json`` file. It has two params: 
* ``verified`` - whatever the proof is verified or not
* ``timestamp`` - identifier for the time that event occurs
