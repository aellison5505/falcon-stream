export { PRIVKEY_SIZE, SIG_MAX, PUBKEY_SIZE } from '../lib/node-falcon-stream';
import { keygen, startSign } from '../lib/node-falcon-stream';
import { initState, adsorb, finalize, releaseState } from 'sha3-shake256';
import { randomFillSync } from 'crypto';

export const nonceSize = 40;
export const shakeBufSize = 8;

export let createKeys = (pubKey: Buffer, privateKey: Buffer) => {
    let shakeCon = Buffer.alloc(8,0);
    let rand = Buffer.alloc(48);
    randomFillSync(rand);

    initState(shakeCon);
    adsorb(shakeCon, rand);
    finalize(shakeCon);

    let i: number;
    i = keygen(shakeCon, pubKey, privateKey);
  
    return i;
}

export let initSign = (shakeMsg: Buffer, nonce: Buffer) => {
    let shakeCon = Buffer.alloc(8,0);
    let rand = Buffer.alloc(48);
    randomFillSync(rand);

    initState(shakeCon);
    adsorb(shakeCon, rand);
    finalize(shakeCon);

    initState(shakeMsg);

    let i: number;
    i = startSign(shakeCon, nonce, shakeMsg);
  
    return i;
}