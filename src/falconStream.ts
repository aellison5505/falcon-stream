import { Transform, TransformOptions, TransformCallback } from 'stream';
import { PRIVKEY_SIZE, PUBKEY_SIZE, SIG_MAX, msgPush,
initVerify, NONCE_SIZE, SHAKE_SIZE, RND_SHAKE_SIZE, SIG_LENGTH,signFinish, verifyFinish, initSign, errors } from './falcon1024';
import { initState, adsorb, finalize, releaseState } from 'sha3-shake256';
import { randomBytes } from 'crypto';
import { endianness } from 'os';

export class FalconStreamSign extends Transform {

    shake256msg: Buffer;
    nonce: Buffer;

    constructor(private privateKey: Buffer, options?: TransformOptions) {
        super(options);
        this.shake256msg = Buffer.alloc(SHAKE_SIZE, 0);
        this.nonce = Buffer.alloc(NONCE_SIZE, 0);
        if(this.privateKey.length !== PRIVKEY_SIZE)
            throw new Error('invalid private key');
        this._init();
    }

    _init() {
        initState(this.shake256msg);
        let i = initSign(this.shake256msg, this.nonce);
        if (i !== 0){
            throw new Error(`${errors[i*-1]}`);
        }
    }

    _destroy() {
        releaseState(this.shake256msg);
    }

    _transform(chunk: Buffer, encoding: any, callback: TransformCallback) {
        if(encoding !== 'buffer')
            chunk = Buffer.from(chunk);
        this._pushMsg(chunk, callback);
    }

    _done(callback: TransformCallback) {
        if(this.readableLength > 0) {
            this.emit('readable');
            this._done(callback);
            return;
        }else{
            this.push(null);
            callback();
        }
    }

    _final(callback: TransformCallback) {
        let sig = Buffer.alloc(SIG_MAX, 0);
        let sigLength = Buffer.alloc(SIG_LENGTH, 0);
        let i = signFinish(sig, sigLength, this.privateKey, this.shake256msg, this.nonce);
        if(i !== 0)
            throw new Error(`${errors[i*-1]}`);
        let b;
        (endianness() === "LE" ? b = Number(sigLength.readBigUInt64LE()) : b = Number(sigLength.readBigUInt64BE()));
        this.push(sig.slice(0, b));
        this._done(callback);
    }

    private _pushMsg(msgChunk: Buffer, callback: TransformCallback) {
        msgPush(this.shake256msg, msgChunk);
        callback();
    }

    private _rndShake256(): Buffer {
        let rndShake = Buffer.alloc(SHAKE_SIZE, 0);
        let rndBytes = randomBytes(RND_SHAKE_SIZE);
        initState(rndShake);
        adsorb(rndShake, rndBytes);
        finalize(rndShake);
        return rndShake;

    }
}

export class FalconStreamVerify extends Transform {

    shake256msg: Buffer;
    nonce: Buffer;

    constructor(private publicKey: Buffer, private signature: Buffer, options?: TransformOptions) {
        super(options);
        this.shake256msg = Buffer.alloc(SHAKE_SIZE, 0);
        this.nonce = Buffer.alloc(NONCE_SIZE, 0);
        if(this.publicKey.length !== PUBKEY_SIZE)
            throw new Error('invalid public key');
        this._init();
    }

    _init() {
        initState(this.shake256msg);
        let i = initVerify(this.shake256msg, this.signature);
        if (i !== 0){
            new Error(`${errors[i*-1]}`);
        }
    }

    _destroy() {
        releaseState(this.shake256msg);
    }

    _transform(chunk: Buffer, encoding: any, callback: TransformCallback) {
        if(encoding !== 'buffer')
            chunk = Buffer.from(chunk);
        this._pushMsg(chunk, callback);
    }

    _done(callback: TransformCallback) {
        if(this.readableLength > 0) {
            this.emit('readable');
            this._done(callback);
            return;
        }else{
            this.push(null);
            callback();
        }
    }

    _final(callback: TransformCallback) {
        let i = verifyFinish(this.signature, this.publicKey, this.shake256msg);
        if(i !== 0) {
            let err =  new Error(`${errors[i*-1]}`);
            callback(err);
            return;
        }
        this.push(Buffer.alloc(1,0));
        this._done(callback);
    }

    private _pushMsg(msgChunk: Buffer, callback: TransformCallback) {
        msgPush(this.shake256msg, msgChunk);
        callback();
    }

    private _rndShake256(): Buffer {
        let rndShake = Buffer.alloc(SHAKE_SIZE, 0);
        let rndBytes = randomBytes(RND_SHAKE_SIZE);
        initState(rndShake);
        adsorb(rndShake, rndBytes);
        finalize(rndShake);
        return rndShake;

    }
}