const { createKeys, PRIVKEY_SIZE, PUBKEY_SIZE } = require('../lib/index');


this.priKey = Buffer.alloc(PRIVKEY_SIZE, 0);
this.pubKey = Buffer.alloc(PUBKEY_SIZE, 0);

let i = createKeys(this.pubKey, this.priKey);

console.log(i);

console.log(this.priKey.toString('hex'));
