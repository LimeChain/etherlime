import { DataItem, MethodAbi } from 'ethereum-types';
import { DataTypeFactory } from '../abstract_data_types/interfaces';
import { AbstractSetDataType } from '../abstract_data_types/types/set';
import { DecodingRules, EncodingRules } from '../utils/rules';
export declare class MethodDataType extends AbstractSetDataType {
    private readonly _methodSignature;
    private readonly _methodSelector;
    private readonly _returnDataType;
    constructor(abi: MethodAbi, dataTypeFactory: DataTypeFactory);
    encode(value: any, rules?: EncodingRules): string;
    decode(calldata: string, rules?: DecodingRules): any[] | object;
    encodeReturnValues(value: any, rules?: EncodingRules): string;
    decodeReturnValues(returndata: string, rules?: DecodingRules): any;
    strictDecodeReturnValue<T>(returndata: string, rules?: DecodingRules): T;
    getSignatureType(): string;
    getSelector(): string;
    getReturnValueDataItem(): DataItem;
    private _computeSignature;
    private _computeSelector;
}
//# sourceMappingURL=method.d.ts.map