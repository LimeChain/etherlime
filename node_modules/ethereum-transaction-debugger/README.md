
Solidity debugger library


### Required Parameters

To start the debugger session, you'll need the following parameters:

- `txHash` - A transaction hash (prefixed with `0x`), for the transaction to debug
- `provider` - A ethers.js provider instance (see [ethers.js](https://docs.ethers.io/ethers.js/html/))
- `contracts` -  An array of contract objects, with the following properties:
  - `contractName` - The name of the contract
  - `source` - The full Solidity source code
  - `sourcePath` - (optional) the path to the Solidity file on disk
  - `ast` - The Solidity compiler's output AST (new style, not `legacyAST`)
  - `binary` - `0x`-prefixed string with the binary used to create a contract instance
  - `sourceMap` - The Solidity compiler output source map for the creation binary
  - `deployedBinary` - `0x`-prefixed string with the on-chain binary for a contract instance
  - `deployedSourceMap` - The source map corresponding to the on-chain binary (from the Solidity compiler)

- `files` - An array of sourcePaths representing file indexes (For example: `/Users/username/etherlimeProject/contracts/LimeFactory.sol`)

### Run

1. Start the debugger session by constructing a Debugger instance with `.forTx()` and then `.connect()` to it:

```javascript
import Debugger from "ethereum-transaction-debugger";

let bugger = await Debugger
  .forTx(txHash, { contracts, files, provider });

let session = bugger.connect();
```

2. Resolve the session's `ready()` promise:

```javascript
await session.ready();
```

3. Use the provided public methods on the `session` instance in order to step through the trace for the transaction:

```javascript
session.stepNext();
session.stepOver();
session.stepInto();
```

4. Access data provided by the debugger via the `session.view()` interface, and the provided selectors:

```javascript
let { ast, data, evm, solidity, trace } = Debugger.selectors;

let variables = session.view(data.current.identifiers.native);
let sourceRange = session.view(solidity.current.sourceRange);
```


### License
MIT
(c) 2019 Truffle, LimeChain LTD