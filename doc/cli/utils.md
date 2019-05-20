# Available Utils

On your disposal there is a global available utils object. Here are the
methods it exposes:

>   - `utils.timeTravel(provider, seconds)` method allowing etherlime
>     ganache to move `seconds` ahead. You need to pass your provider
>     from the EtherlimeGanacheDeployer
>   - `utils.setTimeTo(provider, timestamp)` method allowing etherlime
>     ganache to move to the desired `timestamp` ahead. You need to pass
>     your provider from the EtherlimeGanacheDeployer
>   - `utils.mineBlock(provider)` method telling the etherlime ganache
>     to mine the next block. You need to pass your provider from the
>     EtherlimeGanacheDeployer
>   - `utils.hasEvent(receipt, contract, eventName)` allowing the user
>     to check if the desired event was broadcasted in the transaction
>     receipt. You need to pass the Transaction receipt, the contract
>     that emits it and the name of the Event.
>   - `utils.parseLogs(receipt, contract, eventName)` allowing the user
>     get parsed events from a transaction receipt. You need to pass the
>     Transaction receipt, the contract that emits it and the name of
>     the Event. Always returns an event.

You can read more about how to use utils here:
[etherlime test](test.md)