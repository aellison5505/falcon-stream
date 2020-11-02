const { createKeys, initSign, signPush, signFinish, nonceSize, shakeBufSize ,PRIVKEY_SIZE, PUBKEY_SIZE, SIG_MAX, sigLen } = require('../lib/index');
const { endianness } = require('os');


this.priKey = Buffer.alloc(PRIVKEY_SIZE, 0);
this.pubKey = Buffer.alloc(PUBKEY_SIZE, 0);
this.nonce = Buffer.alloc(nonceSize, 0);
this.shakeMsg = Buffer.alloc(shakeBufSize, 0);
this.signature = Buffer.alloc(SIG_MAX, 0);
this.signLen = Buffer.alloc(sigLen, 0);
this.data1 = "the dog ate the cat. Then killed a bat!";
this.data2 =  "The dog then cased the rabbit into the pool!";

let i = createKeys(this.pubKey, this.priKey);

console.log(i);

console.log(this.priKey.toString('hex'), '\n');

i = initSign(this.shakeMsg, this.nonce);

console.log(this.nonce.toString('hex'));

i = signPush(this.shakeMsg, Buffer.from(this.data1));

i = signPush(this.shakeMsg, Buffer.from(this.data2));

i = signFinish(this.signature, this.signLen, this.priKey, this.shakeMsg, this.nonce);

let b;
(endianness() === "LE" ? b = Number(this.signLen.readBigUInt64LE()) : Number(this.signLen.readBigUInt64BE()));

this.signature = this.signature.slice(0,b);

console.log(this.signature.toString('hex'));

