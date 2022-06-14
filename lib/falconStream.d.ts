/// <reference types="node" />
/// <reference types="node" />
import { Transform, TransformOptions, TransformCallback } from 'stream';
interface FalconStreamOptions extends TransformOptions {
    passThrough?: Boolean;
}
export declare class FalconStreamSign extends Transform {
    private privateKey;
    private options?;
    shake256msg: Buffer;
    nonce: Buffer;
    _signature: Buffer;
    constructor(privateKey: Buffer, options?: FalconStreamOptions | undefined);
    _init(): void;
    _destroy(): void;
    _transform(chunk: Buffer, encoding: any, callback: TransformCallback): void;
    _done(callback: TransformCallback): void;
    get signature(): Buffer;
    _final(callback: TransformCallback): void;
    private _pushMsg;
}
export declare class FalconStreamVerify extends Transform {
    private publicKey;
    private signature;
    shake256msg: Buffer;
    nonce: Buffer;
    constructor(publicKey: Buffer, signature: Buffer, options?: TransformOptions);
    _init(): void;
    _destroy(): void;
    _transform(chunk: Buffer, encoding: any, callback: TransformCallback): void;
    _done(callback: TransformCallback): void;
    _final(callback: TransformCallback): void;
    private _pushMsg;
    private _rndShake256;
}
export {};
//# sourceMappingURL=falconStream.d.ts.map