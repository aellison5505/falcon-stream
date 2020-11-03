/// <reference types="node" />
export { PRIVKEY_SIZE, SIG_MAX, PUBKEY_SIZE } from '../lib/node-falcon-stream';
export declare const NONCE_SIZE = 40;
export declare const SHAKE_SIZE = 8;
export declare const SIG_LENGTH = 8;
export declare const RND_SHAKE_SIZE = 48;
export declare enum errors {
    FALCON_ERR_RANDOM = 1,
    FALCON_ERR_SIZE = 2,
    FALCON_ERR_FORMAT = 3,
    FALCON_ERR_BADSIG = 4,
    FALCON_ERR_BADARG = 5,
    FALCON_ERR_INTERNAL = 6
}
export declare let createKeys: (pubKey: Buffer, privateKey: Buffer) => number;
export declare let initSign: (shakeMsg: Buffer, nonce: Buffer) => number;
export declare let signFinish: (signature: Buffer, signatureLength: Buffer, privateKey: Buffer, msgShake: Buffer, nonce: Buffer) => number;
export declare let initVerify: (msgShake: Buffer, signature: Buffer) => number;
export declare let verifyFinish: (signature: Buffer, publicKey: Buffer, msgShake: Buffer) => number;
export declare let msgPush: (shakeMsg: Buffer, data: Buffer) => number;
//# sourceMappingURL=falcon1024.d.ts.map