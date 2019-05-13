"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addressSchema = require("../schemas/address_schema.json");
var assetPairsRequestOptsSchema = require("../schemas/asset_pairs_request_opts_schema.json");
var blockParamSchema = require("../schemas/block_param_schema.json");
var blockRangeSchema = require("../schemas/block_range_schema.json");
var callDataSchema = require("../schemas/call_data_schema.json");
var ecSignatureParameterSchema = require("../schemas/ec_signature_parameter_schema.json");
var ecSignatureSchema = require("../schemas/ec_signature_schema.json");
var eip712TypedDataSchema = require("../schemas/eip712_typed_data_schema.json");
var hexSchema = require("../schemas/hex_schema.json");
var indexFilterValuesSchema = require("../schemas/index_filter_values_schema.json");
var jsNumber = require("../schemas/js_number_schema.json");
var numberSchema = require("../schemas/number_schema.json");
var orderCancellationRequestsSchema = require("../schemas/order_cancel_schema.json");
var orderConfigRequestSchema = require("../schemas/order_config_request_schema.json");
var orderFillOrKillRequestsSchema = require("../schemas/order_fill_or_kill_requests_schema.json");
var orderFillRequestsSchema = require("../schemas/order_fill_requests_schema.json");
var orderHashSchema = require("../schemas/order_hash_schema.json");
var orderSchema = require("../schemas/order_schema.json");
var orderWatcherWebSocketRequestSchema = require("../schemas/order_watcher_web_socket_request_schema.json");
var orderWatcherWebSocketUtf8MessageSchema = require("../schemas/order_watcher_web_socket_utf8_message_schema.json");
var orderBookRequestSchema = require("../schemas/orderbook_request_schema.json");
var ordersRequestOptsSchema = require("../schemas/orders_request_opts_schema.json");
var ordersSchema = require("../schemas/orders_schema.json");
var pagedRequestOptsSchema = require("../schemas/paged_request_opts_schema.json");
var paginatedCollectionSchema = require("../schemas/paginated_collection_schema.json");
var relayerApiAssetDataPairsResponseSchema = require("../schemas/relayer_api_asset_data_pairs_response_schema.json");
var relayerApiAssetDataPairsSchema = require("../schemas/relayer_api_asset_data_pairs_schema.json");
var relayerApiAssetDataTradeInfoSchema = require("../schemas/relayer_api_asset_data_trade_info_schema.json");
var relayerApiErrorResponseSchema = require("../schemas/relayer_api_error_response_schema.json");
var relayerApiFeeRecipientsResponseSchema = require("../schemas/relayer_api_fee_recipients_response_schema.json");
var relayerApiOrderConfigPayloadSchema = require("../schemas/relayer_api_order_config_payload_schema.json");
var relayerApiOrderConfigResponseSchema = require("../schemas/relayer_api_order_config_response_schema.json");
var relayerApiOrderSchema = require("../schemas/relayer_api_order_schema.json");
var relayerApiOrderbookResponseSchema = require("../schemas/relayer_api_orderbook_response_schema.json");
var relayerApiOrdersChannelSubscribePayloadSchema = require("../schemas/relayer_api_orders_channel_subscribe_payload_schema.json");
var relayerApiOrdersChannelSubscribeSchema = require("../schemas/relayer_api_orders_channel_subscribe_schema.json");
var relayerApiOrdersChannelUpdateSchema = require("../schemas/relayer_api_orders_channel_update_response_schema.json");
var relayerApiOrdersResponseSchema = require("../schemas/relayer_api_orders_response_schema.json");
var relayerApiOrdersSchema = require("../schemas/relayer_api_orders_schema.json");
var requestOptsSchema = require("../schemas/request_opts_schema.json");
var signedOrderSchema = require("../schemas/signed_order_schema.json");
var signedOrdersSchema = require("../schemas/signed_orders_schema.json");
var tokenSchema = require("../schemas/token_schema.json");
var txDataSchema = require("../schemas/tx_data_schema.json");
var wholeNumberSchema = require("../schemas/whole_number_schema.json");
var zeroExTransactionSchema = require("../schemas/zero_ex_transaction_schema.json");
exports.schemas = {
    numberSchema: numberSchema,
    addressSchema: addressSchema,
    callDataSchema: callDataSchema,
    hexSchema: hexSchema,
    ecSignatureParameterSchema: ecSignatureParameterSchema,
    ecSignatureSchema: ecSignatureSchema,
    eip712TypedDataSchema: eip712TypedDataSchema,
    indexFilterValuesSchema: indexFilterValuesSchema,
    orderCancellationRequestsSchema: orderCancellationRequestsSchema,
    orderFillOrKillRequestsSchema: orderFillOrKillRequestsSchema,
    orderFillRequestsSchema: orderFillRequestsSchema,
    orderHashSchema: orderHashSchema,
    orderSchema: orderSchema,
    signedOrderSchema: signedOrderSchema,
    signedOrdersSchema: signedOrdersSchema,
    ordersSchema: ordersSchema,
    blockParamSchema: blockParamSchema,
    blockRangeSchema: blockRangeSchema,
    tokenSchema: tokenSchema,
    jsNumber: jsNumber,
    requestOptsSchema: requestOptsSchema,
    pagedRequestOptsSchema: pagedRequestOptsSchema,
    orderWatcherWebSocketRequestSchema: orderWatcherWebSocketRequestSchema,
    orderWatcherWebSocketUtf8MessageSchema: orderWatcherWebSocketUtf8MessageSchema,
    ordersRequestOptsSchema: ordersRequestOptsSchema,
    orderBookRequestSchema: orderBookRequestSchema,
    orderConfigRequestSchema: orderConfigRequestSchema,
    assetPairsRequestOptsSchema: assetPairsRequestOptsSchema,
    txDataSchema: txDataSchema,
    paginatedCollectionSchema: paginatedCollectionSchema,
    relayerApiErrorResponseSchema: relayerApiErrorResponseSchema,
    relayerApiFeeRecipientsResponseSchema: relayerApiFeeRecipientsResponseSchema,
    relayerApiOrderSchema: relayerApiOrderSchema,
    relayerApiOrdersSchema: relayerApiOrdersSchema,
    relayerApiOrderConfigPayloadSchema: relayerApiOrderConfigPayloadSchema,
    relayerApiOrderConfigResponseSchema: relayerApiOrderConfigResponseSchema,
    relayerApiOrderbookResponseSchema: relayerApiOrderbookResponseSchema,
    relayerApiAssetDataPairsResponseSchema: relayerApiAssetDataPairsResponseSchema,
    relayerApiAssetDataTradeInfoSchema: relayerApiAssetDataTradeInfoSchema,
    relayerApiOrdersChannelSubscribeSchema: relayerApiOrdersChannelSubscribeSchema,
    relayerApiOrdersChannelSubscribePayloadSchema: relayerApiOrdersChannelSubscribePayloadSchema,
    relayerApiOrdersChannelUpdateSchema: relayerApiOrdersChannelUpdateSchema,
    relayerApiOrdersResponseSchema: relayerApiOrdersResponseSchema,
    relayerApiAssetDataPairsSchema: relayerApiAssetDataPairsSchema,
    zeroExTransactionSchema: zeroExTransactionSchema,
    wholeNumberSchema: wholeNumberSchema,
};
//# sourceMappingURL=schemas.js.map