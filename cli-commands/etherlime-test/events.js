let expect = require("chai").expect;
const hasEvent = (receipt, contract, eventName) => {
    expect(receipt).to.have.property("logs");
    expect(contract.interface.events).to.have.property(eventName);
    return receipt.logs.find(e => {
        return e.topics.find(t => {
            return contract.interface.events[eventName].topic == t;
        }) !== undefined;
    }) !== undefined;
}

const parseLogs = (receipt, contract, eventName) => {
    expect(receipt).to.have.property("logs");
    expect(contract.interface.events).to.have.property(eventName);
    const filter = receipt.logs.filter(e => {
        return e.topics.find(t => {
            return contract.interface.events[eventName].topic == t;
        }) !== undefined;
    });

    const res = []
    for (let f of filter) {
        res.push(contract.interface.events[eventName].decode(f.data, f.topics));
    }

    return res
}


module.exports = {
    hasEvent,
    parseLogs
}