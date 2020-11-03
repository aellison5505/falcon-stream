"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgPush = exports.verifyFinish = exports.initVerify = exports.signFinish = exports.initSign = exports.createKeys = exports.errors = exports.RND_SHAKE_SIZE = exports.SIG_LENGTH = exports.SHAKE_SIZE = exports.NONCE_SIZE = exports.PUBKEY_SIZE = exports.SIG_MAX = exports.PRIVKEY_SIZE = void 0;
var node_falcon_stream_1 = require("../lib/node-falcon-stream");
Object.defineProperty(exports, "PRIVKEY_SIZE", { enumerable: true, get: function () { return node_falcon_stream_1.PRIVKEY_SIZE; } });
Object.defineProperty(exports, "SIG_MAX", { enumerable: true, get: function () { return node_falcon_stream_1.SIG_MAX; } });
Object.defineProperty(exports, "PUBKEY_SIZE", { enumerable: true, get: function () { return node_falcon_stream_1.PUBKEY_SIZE; } });
const node_falcon_stream_2 = require("../lib/node-falcon-stream");
const sha3_shake256_1 = require("sha3-shake256");
const crypto_1 = require("crypto");
exports.NONCE_SIZE = 40;
exports.SHAKE_SIZE = 8;
exports.SIG_LENGTH = 8;
exports.RND_SHAKE_SIZE = 48;
let rndShake256 = (shakeCon) => {
    let rand = Buffer.alloc(exports.RND_SHAKE_SIZE);
    crypto_1.randomFillSync(rand);
    sha3_shake256_1.initState(shakeCon);
    sha3_shake256_1.adsorb(shakeCon, rand);
    sha3_shake256_1.finalize(shakeCon);
    return shakeCon;
};
var errors;
(function (errors) {
    errors[errors["FALCON_ERR_RANDOM"] = 1] = "FALCON_ERR_RANDOM";
    errors[errors["FALCON_ERR_SIZE"] = 2] = "FALCON_ERR_SIZE";
    errors[errors["FALCON_ERR_FORMAT"] = 3] = "FALCON_ERR_FORMAT";
    errors[errors["FALCON_ERR_BADSIG"] = 4] = "FALCON_ERR_BADSIG";
    errors[errors["FALCON_ERR_BADARG"] = 5] = "FALCON_ERR_BADARG";
    errors[errors["FALCON_ERR_INTERNAL"] = 6] = "FALCON_ERR_INTERNAL";
})(errors = exports.errors || (exports.errors = {}));
exports.createKeys = (pubKey, privateKey) => {
    let shakeCon = Buffer.alloc(8, 0);
    let rndShake = rndShake256(shakeCon);
    let i;
    i = node_falcon_stream_2.keygen(rndShake, pubKey, privateKey);
    return i;
};
exports.initSign = (shakeMsg, nonce) => {
    let shakeCon = Buffer.alloc(8, 0);
    let rndShake = rndShake256(shakeCon);
    let i;
    sha3_shake256_1.initState(shakeMsg);
    i = node_falcon_stream_2.startSign(rndShake, nonce, shakeMsg);
    return i;
};
exports.signFinish = (signature, signatureLength, privateKey, msgShake, nonce) => {
    let shakeCon = Buffer.alloc(8, 0);
    let rndShake = rndShake256(shakeCon);
    let i = node_falcon_stream_2.finalizeSign(rndShake, signature, signatureLength, privateKey, msgShake, nonce);
    //let b = signatureLength.readBigUInt64LE();
    // console.log(signature.slice(0,Number(b)).toString('hex'));
    return i;
};
exports.initVerify = (msgShake, signature) => {
    sha3_shake256_1.initState(msgShake);
    let i = node_falcon_stream_2.startVerify(msgShake, signature);
    return i;
};
exports.verifyFinish = (signature, publicKey, msgShake) => {
    let i = node_falcon_stream_2.finalizeVerify(signature, publicKey, msgShake);
    return i;
};
exports.msgPush = (shakeMsg, data) => {
    let i = sha3_shake256_1.adsorb(shakeMsg, data);
    return i;
};
//# sourceMappingURL=falcon1024.js.map