"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FalconStreamVerify = exports.FalconStreamSign = void 0;
const stream_1 = require("stream");
const falcon1024_1 = require("./falcon1024");
const sha3_shake256_1 = require("sha3-shake256");
const crypto_1 = require("crypto");
const os_1 = require("os");
class FalconStreamSign extends stream_1.Transform {
    constructor(privateKey, options) {
        super(options);
        this.privateKey = privateKey;
        this.options = options;
        this.shake256msg = Buffer.alloc(falcon1024_1.SHAKE_SIZE, 0);
        this.nonce = Buffer.alloc(falcon1024_1.NONCE_SIZE, 0);
        this._signature = Buffer.alloc(0);
        if (this.privateKey.length !== falcon1024_1.PRIVKEY_SIZE)
            throw new Error('invalid private key');
        this._init();
    }
    _init() {
        (0, sha3_shake256_1.initState)(this.shake256msg);
        let i = (0, falcon1024_1.initSign)(this.shake256msg, this.nonce);
        if (i !== 0) {
            throw new Error(`${falcon1024_1.errors[i * -1]}`);
        }
    }
    _destroy() {
        (0, sha3_shake256_1.releaseState)(this.shake256msg);
    }
    _transform(chunk, encoding, callback) {
        if (encoding !== 'buffer')
            chunk = Buffer.from(chunk);
        this._pushMsg(chunk, callback);
        if (this.options?.passThrough)
            this.push(chunk);
    }
    _done(callback) {
        if (this.readableLength > 0) {
            this.emit('readable');
            this._done(callback);
            return;
        }
        else {
            this.push(null);
            callback();
        }
    }
    get signature() {
        return this._signature;
    }
    _final(callback) {
        let sig = Buffer.alloc(falcon1024_1.SIG_MAX, 0);
        let sigLength = Buffer.alloc(falcon1024_1.SIG_LENGTH, 0);
        let i = (0, falcon1024_1.signFinish)(sig, sigLength, this.privateKey, this.shake256msg, this.nonce);
        if (i !== 0)
            throw new Error(`${falcon1024_1.errors[i * -1]}`);
        let b;
        ((0, os_1.endianness)() === "LE" ? b = Number(sigLength.readBigUInt64LE()) : b = Number(sigLength.readBigUInt64BE()));
        this._signature = sig.slice(0, b);
        // this.push(this.signature);
        this._done(callback);
    }
    _pushMsg(msgChunk, callback) {
        (0, falcon1024_1.msgPush)(this.shake256msg, msgChunk);
        callback();
    }
}
exports.FalconStreamSign = FalconStreamSign;
class FalconStreamVerify extends stream_1.Transform {
    constructor(publicKey, signature, options) {
        super(options);
        this.publicKey = publicKey;
        this.signature = signature;
        this.shake256msg = Buffer.alloc(falcon1024_1.SHAKE_SIZE, 0);
        this.nonce = Buffer.alloc(falcon1024_1.NONCE_SIZE, 0);
        if (this.publicKey.length !== falcon1024_1.PUBKEY_SIZE)
            throw new Error('invalid public key');
        this._init();
    }
    _init() {
        (0, sha3_shake256_1.initState)(this.shake256msg);
        let i = (0, falcon1024_1.initVerify)(this.shake256msg, this.signature);
        if (i !== 0) {
            new Error(`${falcon1024_1.errors[i * -1]}`);
        }
    }
    _destroy() {
        (0, sha3_shake256_1.releaseState)(this.shake256msg);
    }
    _transform(chunk, encoding, callback) {
        if (encoding !== 'buffer')
            chunk = Buffer.from(chunk);
        this._pushMsg(chunk, callback);
    }
    _done(callback) {
        if (this.readableLength > 0) {
            this.emit('readable');
            this._done(callback);
            return;
        }
        else {
            this.push(null);
            callback();
        }
    }
    _final(callback) {
        let i = (0, falcon1024_1.verifyFinish)(this.signature, this.publicKey, this.shake256msg);
        if (i !== 0) {
            let err = new Error(`${falcon1024_1.errors[i * -1]}`);
            callback(err);
            return;
        }
        this.push(Buffer.alloc(1, 0));
        this._done(callback);
    }
    _pushMsg(msgChunk, callback) {
        (0, falcon1024_1.msgPush)(this.shake256msg, msgChunk);
        callback();
    }
    _rndShake256() {
        let rndShake = Buffer.alloc(falcon1024_1.SHAKE_SIZE, 0);
        let rndBytes = (0, crypto_1.randomBytes)(falcon1024_1.RND_SHAKE_SIZE);
        (0, sha3_shake256_1.initState)(rndShake);
        (0, sha3_shake256_1.adsorb)(rndShake, rndBytes);
        (0, sha3_shake256_1.finalize)(rndShake);
        return rndShake;
    }
}
exports.FalconStreamVerify = FalconStreamVerify;
//# sourceMappingURL=falconStream.js.map