etherlime zk-proof
*****************

Syntax
------

::

    etherlime zk-proof [signal] [circuit] [proving_key]

Parameters:

* ``signal`` - [Optional] Specifies the file with public signals input to be used for generating a proof. Defaults to ``input.json`` read from ``zero-knowledge-proof/input`` folder.
* ``circuit`` - [Optional] Specifies the compiled circuit for checking of matched signals. Defaults to: ``circuit.json`` read from ``zero-knowledge-proof/compiled-circuits`` folder.
* ``proving_key`` - [Optional] Specifies the prooving key to be used for generating a proof. Defaults to: ``circuit_proving_key.json`` read from ``zero-knowledge-proof/trusted-setup`` folder.


Running this command will generates a proof based on compiled circuit, public signal input and proving key. A new folder ``generated-proof`` is generated with ``proof`` and ``public_signals``. This proof can be used for off-chain Zero-Knowledge-Proof verification.