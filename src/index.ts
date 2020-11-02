export { PRIVKEY_SIZE, SIG_MAX, PUBKEY_SIZE } from '../lib/node-falcon-stream';
import { keygen, startSign, finalizeSign, SIG_MAX } from '../lib/node-falcon-stream';
import { initState, adsorb, finalize } from 'sha3-shake256';
import { randomFillSync } from 'crypto';

export const nonceSize = 40;
export const shakeBufSize = 8;
export const sigLen = 8;

let rndShake256 = (shakeCon: Buffer) => {
    
    let rand = Buffer.alloc(48);
    randomFillSync(rand);

    initState(shakeCon);
    adsorb(shakeCon, rand);
    finalize(shakeCon);

    return shakeCon;
}

export let createKeys = (pubKey: Buffer, privateKey: Buffer) => {
    let shakeCon = Buffer.alloc(8,0);
    let rndShake = rndShake256(shakeCon);
    let i: number;
    i = keygen(rndShake, pubKey, privateKey);
  
    return i;
}

export let initSign = (shakeMsg: Buffer, nonce: Buffer) => {
    let shakeCon = Buffer.alloc(8,0);
    let rndShake = rndShake256(shakeCon);
    let i: number;
    initState(shakeMsg);

    i = startSign(rndShake, nonce, shakeMsg);
  
    return i;
}

export let signPush = (shakeMsg: Buffer, data: Buffer) => {
    let i = adsorb(shakeMsg, data);
    return i;
}

export let signFinish = (signature: Buffer, signatureLength: Buffer, privateKey: Buffer, msgShake: Buffer, nonce: Buffer ) => {
    let shakeCon = Buffer.alloc(8,0);
    let rndShake = rndShake256(shakeCon);
    let i = finalizeSign(rndShake, signature, signatureLength, privateKey, msgShake, nonce)
    //let b = signatureLength.readBigUInt64LE();
   // console.log(signature.slice(0,Number(b)).toString('hex'));
    return i;

}




