import debugModule from "debug";
const debug = debugModule("debugger:session:sagas");

import { call, all, fork, take, put } from "redux-saga/effects";

import { prefixName } from "../../helpers";

import * as ast from "../../ast/sagas";
import * as controller from "../../controller/sagas";
import * as solidity from "../../solidity/sagas";
import * as evm from "../../evm/sagas";
import * as trace from "../../trace/sagas";
import * as data from "../../data/sagas";
import * as ethers from "../../ethers/sagas";

import * as actions from "../actions";

export function* saga() {
  debug("starting listeners");
  yield* forkListeners();

  // receiving & saving contracts into state
  debug("waiting for contract information");
  let { contexts, sources } = yield take(actions.RECORD_CONTRACTS);

  debug("recording contract binaries");
  yield* recordContexts(...contexts);

  debug("recording contract sources");
  yield* recordSources(...sources);

  debug("waiting for start");
  // wait for start signal
  let { txHash, provider } = yield take(actions.START);
  debug("starting");

  // process transaction
  debug("fetching transaction info");
  let err = yield* fetchTx(txHash, provider);
  if (err) {
    debug("error %o", err);
    yield* error(err);
  } else {
    debug("visiting ASTs");
    // visit asts
    yield* ast.visitAll();

    debug("readying");
    // signal that stepping can begin
    yield* ready();
  }
}

export default prefixName("session", saga);

function* forkListeners() {
  return yield all(
    [ast, controller, data, evm, solidity, trace, ethers].map(app =>
      fork(app.saga)
    )
  );
}

function* fetchTx(txHash, provider) {
  let result = yield* ethers.inspectTransaction(txHash, provider);

  if (result.error) {
    return result.error;
  }

  yield* evm.begin(result);

  let addresses = yield* trace.processTrace(result.trace);
  if (result.address && addresses.indexOf(result.address) == -1) {
    addresses.push(result.address);
  }

  let binaries = yield* ethers.obtainBinaries(addresses);
  yield all(
    addresses.map((address, i) => call(recordInstance, address, binaries[i]))
  );
}

function* recordContexts(...contexts) {
  for (let { contractName, binary, sourceMap, compiler } of contexts) {
    yield* evm.addContext(contractName, { binary }, compiler);

    if (sourceMap) {
      yield* solidity.addSourceMap(binary, sourceMap);
    }
  }
}

function* recordSources(...sources) {
  for (let i = 0; i < sources.length; i++) {
    const sourceData = sources[i];
    if (sourceData !== undefined && sourceData !== null) {
      yield* solidity.addSource(
        sourceData.source,
        sourceData.sourcePath,
        sourceData.ast
      );
    }
  }
}

function* recordInstance(address, binary) {
  yield* evm.addInstance(address, binary);
}

function* recordUserDefinedTypes(sources) {
  yield* data.recordUserDefinedTypes(sources);
}

function* ready() {
  yield put(actions.ready());
}

function* error(err) {
  yield put(actions.error(err));
}
