# etherlime zk

In order to start a project with Zero Knowledge Proof, please refer to [etherlime init command](https://etherlime.readthedocs.io/en/latest/cli/init.html#).

Available Commands:

## Circuit Compilation

> * `etherlime zk compile` Running this command will compile a circuit
>
>     file located in `zero-knowledge-proof/circuits` and generates a
>
>     new folder `compiled-circuits`.

## Establish Trusted Setup

> * `etherlime zk setup` Running this command will establish a trusted
>
>     setup based on compiled circuit and generates a folder \`trusted
>
>     setup`with`proving\_key`and`verification\_key\`. The command
>
>     reads the compiled circuit from
>
>     `zero-knowledge-proof/compiled-circuits`.

## Generate ZK Proof

> * `etherlime zk proof [signal] [circuit] [provingKey]` Running this
>
>     command will generates a proof based on compiled circuit, public
>
>     signal input and proving key. A new folder `generated-proof` is
>
>     generated with `proof` and `public_signals`. This proof can be
>
>     used for off-chain Zero-Knowledge-Proof verification.
>
>   > * Parameters:
>   >   * `signal` - \[Optional\] Specifies the file with public
>   >
>   >     signals input to be used for generating a proof.
>   >
>   >     Defaults to `input.json` read from
>   >
>   >     `zero-knowledge-proof/input` folder.
>   >
>   >   * `circuit` - \[Optional\] Specifies the compiled circuit
>   >
>   >     for checking of matched signals. Defaults to:
>   >
>   >     `circuit.json` read from
>   >
>   >     `zero-knowledge-proof/compiled-circuits` folder.
>   >
>   >   * `provingKey` - \[Optional\] Specifies the prooving key
>   >
>   >     to be used for generating a proof. Defaults to:
>   >
>   >     `circuit_proving_key.json` read from
>   >
>   >     `zero-knowledge-proof/trusted-setup` folder.

## Verify Proof \(Off-chain\)

> * `etherlime zk verify [publicSignals] [proof] [verifierKey]`
>
>     Running this command will generates a verifier based on public
>
>     signals file that comes out of the proof command, the proof itself
>
>     and verifier key. A new folder `verified-proof` is generated with
>
>     `output.json` file.
>
>   > * Parameters:
>   >   * `publicSignals` - \[Optional\] Specifies the file with
>   >
>   >     signals to be used for generating verifying a proof.
>   >
>   >     Defaults to `circuit_public_signals.json` read from
>   >
>   >     `zero-knowledge-proof/generated-proof` folder.
>   >
>   >   * `proof` - \[Optional\] Specifies the compiled proof that
>   >
>   >     would be used for generating a proof based on it.
>   >
>   >     Defaults to: `circuit_proof.json` read from
>   >
>   >     `zero-knowledge-proof/generated-proof` folder.
>   >
>   >   * `verifierKey` - \[Optional\] Specifies the verifier key
>   >
>   >     to be used for generating a proof. Defaults to:
>   >
>   >     `circuit_verification_key.json` read from
>   >
>   >     `zero-knowledge-proof/trusted-setup` folder.
>   >
>   >   * `output.json` file has two params:
>   >     * `verified` - whatever the proof is verified or not
>   >     * `timestamp` - identifier for the time that event occurs

## Generate Smart Contract for On-Chain Verification

> * `etherlime zk generate [verifierKey]` Generates a verifier smart
>
>     contract based on verification key which can be used for on-chain
>
>     verification. The smart contract is written in contracts folder
>
>     and it is ready to be compiled and deployed with \`etherlime
>
>     compile`and`etherlime deploy\`. The verifier smart contract has a
>
>     public view method `verifyProof` that can be called for on-chain
>
>     verification. You can generate the call parameters with \`etherlime
>
>     zk-generate-call\` cli command.
>
>   > * Parameters:
>   >   * `verifierKey` - \[Optional\] Specifies the verifier key
>   >
>   >     to be used for generating a verifier smart contract.
>   >
>   >     Defaults to: circuit\_verification\_key.json read from
>   >
>   >     `zero-knowledge-proof/generated-proof` folder.

## Generate output call based for On-chanin Verification

> * `etherlime zk call [publicSignals] [proof]` Running this command
>
>     will generates a call based on proof and public signals. A new
>
>     folder `generated-call` is generated with `generatedCall.json`
>
>     file. This generated call can be used for on-chain verification,
>
>     for calling public view method `verifyProof` of the generated
>
>     verifier contract with this data.
>
>   > * Parameters:
>   >   * `publicSignals` - \[Optional\] Specifies the file with
>   >
>   >     signals to be used for generating verifying a proof.
>   >
>   >     Defaults to `circuit_public_signals.json` read from
>   >
>   >     `zero-knowledge-proof/generated-proof` folder.
>   >
>   >   * `proof` - \[Optional\] Specifies the compiled proof that
>   >
>   >     would be used for generating a proof based on it.
>   >
>   >     Defaults to: `circuit_proof.json` read from
>   >
>   >     `zero-knowledge-proof/generated-proof` folder.

