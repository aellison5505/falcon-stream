/// <reference types="node" />
export { PRIVKEY_SIZE, SIG_MAX, PUBKEY_SIZE } from '../lib/node-falcon-stream';
export declare const nonceSize = 40;
export declare const shakeBufSize = 8;
export declare const sigLen = 8;
export declare let createKeys: (pubKey: Buffer, privateKey: Buffer) => number;
export declare let initSign: (shakeMsg: Buffer, nonce: Buffer) => number;
export declare let signPush: (shakeMsg: Buffer, data: Buffer) => number;
export declare let signFinish: (signature: Buffer, signatureLength: Buffer, privateKey: Buffer, msgShake: Buffer, nonce: Buffer) => number;
//# sourceMappingURL=index.d.ts.map