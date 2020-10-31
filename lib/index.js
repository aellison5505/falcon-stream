"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeys = exports.PUBKEY_SIZE = exports.SIG_MAX = exports.PRIVKEY_SIZE = void 0;
var node_falcon_stream_1 = require("../lib/node-falcon-stream");
Object.defineProperty(exports, "PRIVKEY_SIZE", { enumerable: true, get: function () { return node_falcon_stream_1.PRIVKEY_SIZE; } });
Object.defineProperty(exports, "SIG_MAX", { enumerable: true, get: function () { return node_falcon_stream_1.SIG_MAX; } });
Object.defineProperty(exports, "PUBKEY_SIZE", { enumerable: true, get: function () { return node_falcon_stream_1.PUBKEY_SIZE; } });
const node_falcon_stream_2 = require("../lib/node-falcon-stream");
const sha3_shake256_1 = require("sha3-shake256");
const crypto_1 = require("crypto");
exports.createKeys = (pubKey, privateKey) => {
    let shakeCon = Buffer.alloc(8, 0);
    let rand = Buffer.alloc(48);
    crypto_1.randomFillSync(rand);
    sha3_shake256_1.initState(shakeCon);
    sha3_shake256_1.adsorb(shakeCon, rand);
    sha3_shake256_1.finalize(shakeCon);
    let i;
    i = node_falcon_stream_2.keygen(shakeCon, pubKey, privateKey);
    return i;
};
//# sourceMappingURL=index.js.map