const { createKeys, initSign, nonceSize, shakeBufSize ,PRIVKEY_SIZE, PUBKEY_SIZE } = require('../lib/index');


this.priKey = Buffer.alloc(PRIVKEY_SIZE, 0);
this.pubKey = Buffer.alloc(PUBKEY_SIZE, 0);
this.nonce = Buffer.alloc(nonceSize, 0);
this.shakeMsg = Buffer.alloc(shakeBufSize, 0);

let i = createKeys(this.pubKey, this.priKey);

console.log(i);

console.log(this.priKey.toString('hex'), '\n');

i = initSign(this.shakeMsg, this.nonce);

console.log(this.nonce.toString('hex'));
