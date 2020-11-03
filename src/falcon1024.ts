export { PRIVKEY_SIZE, SIG_MAX, PUBKEY_SIZE } from '../lib/node-falcon-stream';
import { keygen, startSign, finalizeSign, startVerify, finalizeVerify } from '../lib/node-falcon-stream';
import { initState, adsorb, finalize } from 'sha3-shake256';
import { randomFillSync } from 'crypto';

export const NONCE_SIZE = 40;
export const SHAKE_SIZE = 8;
export const SIG_LENGTH = 8;
export const RND_SHAKE_SIZE = 48;

let rndShake256 = (shakeCon: Buffer) => {
    
    let rand = Buffer.alloc(RND_SHAKE_SIZE);
    randomFillSync(rand);

    initState(shakeCon);
    adsorb(shakeCon, rand);
    finalize(shakeCon);

    return shakeCon;
}

export enum errors {
    FALCON_ERR_RANDOM = 1,
    FALCON_ERR_SIZE,
    FALCON_ERR_FORMAT,
    FALCON_ERR_BADSIG,
    FALCON_ERR_BADARG,
    FALCON_ERR_INTERNAL
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

export let signFinish = (signature: Buffer, signatureLength: Buffer, privateKey: Buffer, msgShake: Buffer, nonce: Buffer ) => {
    let shakeCon = Buffer.alloc(8,0);
    let rndShake = rndShake256(shakeCon);
    let i = finalizeSign(rndShake, signature, signatureLength, privateKey, msgShake, nonce)
    //let b = signatureLength.readBigUInt64LE();
   // console.log(signature.slice(0,Number(b)).toString('hex'));
    return i;

}

export let initVerify = (msgShake: Buffer, signature: Buffer) => {
    initState(msgShake);
    let i = startVerify(msgShake, signature);
    return i;
}

export let verifyFinish = (signature: Buffer, publicKey: Buffer, msgShake: Buffer)=> {
    let i = finalizeVerify(signature, publicKey, msgShake);
    return i;
}

export let msgPush = (shakeMsg: Buffer, data: Buffer) => {
    let i = adsorb(shakeMsg, data);
    return i;
}







