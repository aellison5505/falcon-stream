export { PRIVKEY_SIZE, SIG_MAX, PUBKEY_SIZE } from '../lib/node-falcon-stream';
import { keygen } from '../lib/node-falcon-stream';
import { initState, adsorb, finalize, releaseState } from 'sha3-shake256';
import { randomFillSync } from 'crypto';

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