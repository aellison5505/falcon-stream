/// <reference types="node" />
import { Transform, TransformOptions, TransformCallback } from 'stream';
export declare class FalconStreamSign extends Transform {
    private privateKey;
    shake256msg: Buffer;
    nonce: Buffer;
    constructor(privateKey: Buffer, options?: TransformOptions);
    _init(): void;
    _destroy(): void;
    _transform(chunk: Buffer, encoding: any, callback: TransformCallback): void;
    _done(callback: TransformCallback): void;
    _final(callback: TransformCallback): void;
    private _pushMsg;
    private _rndShake256;
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
//# sourceMappingURL=falconStream.d.ts.map