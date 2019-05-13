export declare const schemas: {
    numberSchema: {
        "id": string;
        "type": string;
        "pattern": string;
    };
    addressSchema: {
        "id": string;
        "type": string;
        "pattern": string;
    };
    callDataSchema: {
        "id": string;
        "properties": {
            "from": {
                "$ref": string;
            };
            "to": {
                "$ref": string;
            };
            "value": {
                "oneOf": {
                    "$ref": string;
                }[];
            };
            "gas": {
                "oneOf": {
                    "$ref": string;
                }[];
            };
            "gasPrice": {
                "oneOf": {
                    "$ref": string;
                }[];
            };
            "data": {
                "type": string;
                "pattern": string;
            };
            "nonce": {
                "type": string;
                "minimum": number;
            };
        };
        "required": never[];
        "type": string;
        "additionalProperties": boolean;
    };
    hexSchema: {
        "id": string;
        "type": string;
        "pattern": string;
    };
    ecSignatureParameterSchema: {
        "id": string;
        "type": string;
        "pattern": string;
    };
    ecSignatureSchema: {
        "id": string;
        "properties": {
            "v": {
                "type": string;
                "minimum": number;
                "maximum": number;
            };
            "r": {
                "$ref": string;
            };
            "s": {
                "$ref": string;
            };
        };
        "required": string[];
        "type": string;
    };
    eip712TypedDataSchema: {
        "id": string;
        "type": string;
        "properties": {
            "types": {
                "type": string;
                "properties": {
                    "EIP712Domain": {
                        "type": string;
                    };
                };
                "additionalProperties": {
                    "type": string;
                    "items": {
                        "type": string;
                        "properties": {
                            "name": {
                                "type": string;
                            };
                            "type": {
                                "type": string;
                            };
                        };
                        "required": string[];
                    };
                };
                "required": string[];
            };
            "primaryType": {
                "type": string;
            };
            "domain": {
                "type": string;
            };
            "message": {
                "type": string;
            };
        };
        "required": string[];
    };
    indexFilterValuesSchema: {
        "id": string;
        "additionalProperties": {
            "oneOf": {
                "$ref": string;
            }[];
        };
        "type": string;
    };
    orderCancellationRequestsSchema: {
        "id": string;
        "type": string;
        "items": {
            "properties": {
                "order": {
                    "$ref": string;
                };
                "takerTokenCancelAmount": {
                    "$ref": string;
                };
            };
            "required": string[];
            "type": string;
        };
    };
    orderFillOrKillRequestsSchema: {
        "id": string;
        "type": string;
        "items": {
            "properties": {
                "signedOrder": {
                    "$ref": string;
                };
                "fillTakerAmount": {
                    "$ref": string;
                };
            };
            "required": string[];
            "type": string;
        };
    };
    orderFillRequestsSchema: {
        "id": string;
        "type": string;
        "items": {
            "properties": {
                "signedOrder": {
                    "$ref": string;
                };
                "takerTokenFillAmount": {
                    "$ref": string;
                };
            };
            "required": string[];
            "type": string;
        };
    };
    orderHashSchema: {
        "id": string;
        "type": string;
        "pattern": string;
    };
    orderSchema: {
        "id": string;
        "properties": {
            "makerAddress": {
                "$ref": string;
            };
            "takerAddress": {
                "$ref": string;
            };
            "makerFee": {
                "$ref": string;
            };
            "takerFee": {
                "$ref": string;
            };
            "senderAddress": {
                "$ref": string;
            };
            "makerAssetAmount": {
                "$ref": string;
            };
            "takerAssetAmount": {
                "$ref": string;
            };
            "makerAssetData": {
                "$ref": string;
            };
            "takerAssetData": {
                "$ref": string;
            };
            "salt": {
                "$ref": string;
            };
            "exchangeAddress": {
                "$ref": string;
            };
            "feeRecipientAddress": {
                "$ref": string;
            };
            "expirationTimeSeconds": {
                "$ref": string;
            };
        };
        "required": string[];
        "type": string;
    };
    signedOrderSchema: {
        "id": string;
        "allOf": ({
            "$ref": string;
            "properties"?: undefined;
            "required"?: undefined;
        } | {
            "properties": {
                "signature": {
                    "$ref": string;
                };
            };
            "required": string[];
            "$ref"?: undefined;
        })[];
    };
    signedOrdersSchema: {
        "id": string;
        "type": string;
        "items": {
            "$ref": string;
        };
    };
    ordersSchema: {
        "id": string;
        "type": string;
        "items": {
            "$ref": string;
        };
    };
    blockParamSchema: {
        "id": string;
        "oneOf": ({
            "type": string;
            "enum"?: undefined;
        } | {
            "enum": string[];
            "type"?: undefined;
        })[];
    };
    blockRangeSchema: {
        "id": string;
        "properties": {
            "fromBlock": {
                "$ref": string;
            };
            "toBlock": {
                "$ref": string;
            };
        };
        "type": string;
    };
    tokenSchema: {
        "id": string;
        "properties": {
            "name": {
                "type": string;
            };
            "symbol": {
                "type": string;
            };
            "decimals": {
                "type": string;
            };
            "address": {
                "$ref": string;
            };
        };
        "required": string[];
        "type": string;
    };
    jsNumber: {
        "id": string;
        "type": string;
        "minimum": number;
    };
    requestOptsSchema: {
        "id": string;
        "type": string;
        "properties": {
            "networkId": {
                "type": string;
            };
        };
    };
    pagedRequestOptsSchema: {
        "id": string;
        "type": string;
        "properties": {
            "page": {
                "type": string;
            };
            "perPage": {
                "type": string;
            };
        };
    };
    orderWatcherWebSocketRequestSchema: {
        "id": string;
        "type": string;
        "definitions": {
            "signedOrderParam": {
                "type": string;
                "properties": {
                    "signedOrder": {
                        "$ref": string;
                    };
                };
                "required": string[];
            };
            "orderHashParam": {
                "type": string;
                "properties": {
                    "orderHash": {
                        "$ref": string;
                    };
                };
                "required": string[];
            };
        };
        "oneOf": ({
            "type": string;
            "properties": {
                "id": {
                    "type": string;
                };
                "jsonrpc": {
                    "type": string;
                };
                "method": {
                    "enum": string[];
                };
                "params": {
                    "$ref": string;
                };
            };
            "required": string[];
        } | {
            "type": string;
            "properties": {
                "id": {
                    "type": string;
                };
                "jsonrpc": {
                    "type": string;
                };
                "method": {
                    "enum": string[];
                };
                "params": {
                    "$ref"?: undefined;
                };
            };
            "required": string[];
        })[];
    };
    orderWatcherWebSocketUtf8MessageSchema: {
        "id": string;
        "properties": {
            "utf8Data": {
                "type": string;
            };
        };
        "required": string[];
        "type": string;
    };
    ordersRequestOptsSchema: {
        "id": string;
        "type": string;
        "properties": {
            "makerAssetProxyId": {
                "$ref": string;
            };
            "takerAssetProxyId": {
                "$ref": string;
            };
            "makerAssetAddress": {
                "$ref": string;
            };
            "takerAssetAddress": {
                "$ref": string;
            };
            "exchangeAddress": {
                "$ref": string;
            };
            "senderAddress": {
                "$ref": string;
            };
            "makerAssetData": {
                "$ref": string;
            };
            "takerAssetData": {
                "$ref": string;
            };
            "traderAssetData": {
                "$ref": string;
            };
            "makerAddress": {
                "$ref": string;
            };
            "takerAddress": {
                "$ref": string;
            };
            "traderAddress": {
                "$ref": string;
            };
            "feeRecipientAddress": {
                "$ref": string;
            };
        };
    };
    orderBookRequestSchema: {
        "id": string;
        "type": string;
        "properties": {
            "baseAssetData": {
                "$ref": string;
            };
            "quoteAssetData": {
                "$ref": string;
            };
        };
        "required": string[];
    };
    orderConfigRequestSchema: {
        "id": string;
        "type": string;
        "properties": {
            "makerAddress": {
                "$ref": string;
            };
            "takerAddress": {
                "$ref": string;
            };
            "makerAssetAmount": {
                "$ref": string;
            };
            "takerAssetAmount": {
                "$ref": string;
            };
            "makerAssetData": {
                "$ref": string;
            };
            "takerAssetData": {
                "$ref": string;
            };
            "exchangeAddress": {
                "$ref": string;
            };
            "expirationTimeSeconds": {
                "$ref": string;
            };
        };
        "required": string[];
    };
    assetPairsRequestOptsSchema: {
        "id": string;
        "type": string;
        "properties": {
            "assetDataA": {
                "$ref": string;
            };
            "assetDataB": {
                "$ref": string;
            };
        };
    };
    txDataSchema: {
        "id": string;
        "properties": {
            "from": {
                "$ref": string;
            };
            "to": {
                "$ref": string;
            };
            "value": {
                "oneOf": {
                    "$ref": string;
                }[];
            };
            "gas": {
                "oneOf": {
                    "$ref": string;
                }[];
            };
            "gasPrice": {
                "oneOf": {
                    "$ref": string;
                }[];
            };
            "data": {
                "type": string;
                "pattern": string;
            };
            "nonce": {
                "type": string;
                "minimum": number;
            };
        };
        "required": string[];
        "type": string;
    };
    paginatedCollectionSchema: {
        "id": string;
        "type": string;
        "properties": {
            "total": {
                "type": string;
            };
            "perPage": {
                "type": string;
            };
            "page": {
                "type": string;
            };
        };
        "required": string[];
    };
    relayerApiErrorResponseSchema: {
        "id": string;
        "type": string;
        "properties": {
            "code": {
                "type": string;
                "minimum": number;
                "maximum": number;
            };
            "reason": {
                "type": string;
            };
            "validationErrors": {
                "type": string;
                "items": {
                    "type": string;
                    "properties": {
                        "field": {
                            "type": string;
                        };
                        "code": {
                            "type": string;
                            "minimum": number;
                            "maximum": number;
                        };
                        "reason": {
                            "type": string;
                        };
                    };
                    "required": string[];
                };
            };
        };
        "required": string[];
    };
    relayerApiFeeRecipientsResponseSchema: {
        "id": string;
        "type": string;
        "allOf": ({
            "$ref": string;
            "properties"?: undefined;
            "required"?: undefined;
        } | {
            "properties": {
                "records": {
                    "type": string;
                    "items": {
                        "$ref": string;
                    };
                };
            };
            "required": string[];
            "$ref"?: undefined;
        })[];
    };
    relayerApiOrderSchema: {
        "id": string;
        "type": string;
        "properties": {
            "order": {
                "$ref": string;
            };
            "metaData": {
                "type": string;
            };
        };
        "required": string[];
    };
    relayerApiOrdersSchema: {
        "id": string;
        "type": string;
        "items": {
            "$ref": string;
        };
    };
    relayerApiOrderConfigPayloadSchema: {
        "id": string;
        "type": string;
        "properties": {
            "makerAddress": {
                "$ref": string;
            };
            "takerAddress": {
                "$ref": string;
            };
            "makerAssetAmount": {
                "$ref": string;
            };
            "takerAssetAmount": {
                "$ref": string;
            };
            "makerAssetData": {
                "$ref": string;
            };
            "takerAssetData": {
                "$ref": string;
            };
            "exchangeAddress": {
                "$ref": string;
            };
            "expirationTimeSeconds": {
                "$ref": string;
            };
        };
        "required": string[];
    };
    relayerApiOrderConfigResponseSchema: {
        "id": string;
        "type": string;
        "properties": {
            "makerFee": {
                "$ref": string;
            };
            "takerFee": {
                "$ref": string;
            };
            "feeRecipientAddress": {
                "$ref": string;
            };
            "senderAddress": {
                "$ref": string;
            };
        };
        "required": string[];
    };
    relayerApiOrderbookResponseSchema: {
        "id": string;
        "type": string;
        "properties": {
            "bids": {
                "$ref": string;
            };
            "asks": {
                "$ref": string;
            };
        };
        "required": string[];
    };
    relayerApiAssetDataPairsResponseSchema: {
        "id": string;
        "type": string;
        "allOf": ({
            "$ref": string;
            "properties"?: undefined;
            "required"?: undefined;
        } | {
            "properties": {
                "records": {
                    "$ref": string;
                };
            };
            "required": string[];
            "$ref"?: undefined;
        })[];
    };
    relayerApiAssetDataTradeInfoSchema: {
        "id": string;
        "type": string;
        "properties": {
            "assetData": {
                "$ref": string;
            };
            "minAmount": {
                "$ref": string;
            };
            "maxAmount": {
                "$ref": string;
            };
            "precision": {
                "type": string;
            };
        };
        "required": string[];
    };
    relayerApiOrdersChannelSubscribeSchema: {
        "id": string;
        "type": string;
        "properties": {
            "type": {
                "enum": string[];
            };
            "channel": {
                "enum": string[];
            };
            "requestId": {
                "type": string;
            };
            "payload": {
                "$ref": string;
            };
        };
        "required": string[];
    };
    relayerApiOrdersChannelSubscribePayloadSchema: {
        "id": string;
        "type": string;
        "properties": {
            "makerAssetProxyId": {
                "$ref": string;
            };
            "takerAssetProxyId": {
                "$ref": string;
            };
            "networkId": {
                "type": string;
            };
            "makerAssetAddress": {
                "$ref": string;
            };
            "takerAssetAddress": {
                "$ref": string;
            };
            "makerAssetData": {
                "$ref": string;
            };
            "takerAssetData": {
                "$ref": string;
            };
            "traderAssetData": {
                "$ref": string;
            };
        };
    };
    relayerApiOrdersChannelUpdateSchema: {
        "id": string;
        "type": string;
        "properties": {
            "type": {
                "enum": string[];
            };
            "channel": {
                "enum": string[];
            };
            "requestId": {
                "type": string;
            };
            "payload": {
                "$ref": string;
            };
        };
        "required": string[];
    };
    relayerApiOrdersResponseSchema: {
        "id": string;
        "type": string;
        "allOf": ({
            "$ref": string;
            "properties"?: undefined;
            "required"?: undefined;
        } | {
            "properties": {
                "records": {
                    "$ref": string;
                };
            };
            "required": string[];
            "$ref"?: undefined;
        })[];
    };
    relayerApiAssetDataPairsSchema: {
        "id": string;
        "type": string;
        "items": {
            "properties": {
                "assetDataA": {
                    "$ref": string;
                };
                "assetDataB": {
                    "$ref": string;
                };
            };
            "required": string[];
            "type": string;
        };
    };
    zeroExTransactionSchema: {
        "id": string;
        "properties": {
            "verifyingContractAddress": {
                "$ref": string;
            };
            "data": {
                "$ref": string;
            };
            "signerAddress": {
                "$ref": string;
            };
            "salt": {
                "$ref": string;
            };
        };
        "required": string[];
        "type": string;
    };
    wholeNumberSchema: {
        "id": string;
        "anyOf": ({
            "type": string;
            "pattern": string;
        } | {
            "type": string;
            "pattern"?: undefined;
        })[];
    };
};
//# sourceMappingURL=schemas.d.ts.map