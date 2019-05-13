export declare const fixtureData: {
    NULL_ADDRESS: string;
    TEST_RPC_ACCOUNT_0: string;
    TEST_RPC_ACCOUNT_0_ACCOUNT_PRIVATE_KEY: string;
    TEST_RPC_ACCOUNT_1: string;
    TEST_RPC_MNEMONIC: string;
    TEST_RPC_MNEMONIC_BASE_DERIVATION_PATH: string;
    PERSONAL_MESSAGE_STRING: string;
    PERSONAL_MESSAGE_SIGNED_RESULT: string;
    PERSONAL_MESSAGE_ACCOUNT_1_SIGNED_RESULT: string;
    TESTRPC_BASE_DERIVATION_PATH: string;
    NETWORK_ID: number;
    TX_DATA: {
        nonce: string;
        gasPrice: string;
        gas: string;
        to: string;
        value: string;
        chainId: number;
        from: string;
    };
    TX_DATA_SIGNED_RESULT: string;
    TX_DATA_ACCOUNT_1_SIGNED_RESULT: string;
    EIP712_TEST_TYPED_DATA: {
        types: {
            EIP712Domain: {
                name: string;
                type: string;
            }[];
            Test: {
                name: string;
                type: string;
            }[];
        };
        domain: {
            name: string;
        };
        message: {
            testAddress: string;
            testNumber: string;
        };
        primaryType: string;
    };
    EIP712_TEST_TYPED_DATA_HASH: string;
    EIP712_TEST_TYPED_DATA_SIGNED_RESULT: string;
};
//# sourceMappingURL=fixture_data.d.ts.map