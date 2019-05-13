import { EIP712TypedData } from '@0x/types';
import * as lightwallet from 'eth-lightwallet';
import { PartialTxParams } from '../types';
import { BaseWalletSubprovider } from './base_wallet_subprovider';
export declare class EthLightwalletSubprovider extends BaseWalletSubprovider {
    private readonly _keystore;
    private readonly _pwDerivedKey;
    /**
     * Instantiate an EthLightwalletSubprovider
     * @param keystore The EthLightWallet keystore you wish to use
     * @param pwDerivedKey The password derived key to use
     * @return EthLightwalletSubprovider instance
     */
    constructor(keystore: lightwallet.keystore, pwDerivedKey: Uint8Array);
    /**
     * Retrieve the accounts associated with the eth-lightwallet instance.
     * This method is implicitly called when issuing a `eth_accounts` JSON RPC request
     * via your providerEngine instance.
     *
     * @return An array of accounts
     */
    getAccountsAsync(): Promise<string[]>;
    /**
     * Signs a transaction with the account specificed by the `from` field in txParams.
     * If you've added this Subprovider to your app's provider, you can simply send
     * an `eth_sendTransaction` JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param txParams Parameters of the transaction to sign
     * @return Signed transaction hex string
     */
    signTransactionAsync(txParams: PartialTxParams): Promise<string>;
    /**
     * Sign a personal Ethereum signed message. The signing account will be the account
     * associated with the provided address.
     * If you've added this Subprovider to your app's provider, you can simply send an `eth_sign`
     * or `personal_sign` JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param data Hex string message to sign
     * @param address Address of the account to sign with
     * @return Signature hex string (order: rsv)
     */
    signPersonalMessageAsync(data: string, address: string): Promise<string>;
    /**
     * Sign an EIP712 Typed Data message. The signing address will associated with the provided address.
     * If you've added this Subprovider to your app's provider, you can simply send an `eth_signTypedData`
     * JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param address Address of the account to sign with
     * @param data the typed data object
     * @return Signature hex string (order: rsv)
     */
    signTypedDataAsync(address: string, typedData: EIP712TypedData): Promise<string>;
}
//# sourceMappingURL=eth_lightwallet_subprovider.d.ts.map