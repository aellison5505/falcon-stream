const { createKeys, initSign, msgPush, signFinish, initVerify, verifyFinish, nonceSize, shakeBufSize ,PRIVKEY_SIZE, PUBKEY_SIZE, SIG_MAX, sigLen } = require('../lib/index');
const expect = require('chai').expect;
const { endianness } = require('os');

describe('Falcon Stream Signature', () => {
    
    before(() => {
        this.priKey = Buffer.alloc(PRIVKEY_SIZE, 0);
        this.pubKey = Buffer.alloc(PUBKEY_SIZE, 0);
        this.nonce = Buffer.alloc(nonceSize, 0);
        this.shakeMsg = Buffer.alloc(shakeBufSize, 0);
        this.shakeMsgVerify = Buffer.alloc(shakeBufSize, 0);
        this.sign = Buffer.alloc(SIG_MAX, 0);
        this.signLen = Buffer.alloc(sigLen, 0);
        this.data1 = "the dog ate the cat. Then killed a bat!";
        this.data2 =  "The dog then cased the rabbit into the pool!";
    });

    describe('#createKeys', () => {
        before(() => {
            this.i = createKeys(this.pubKey, this.priKey);
        });
        it('should return the keys',() => {
            expect(this.pubKey[this.pubKey.length-1]).to.be.greaterThan(0);
        });
    })
    describe('#initSign', () => {
        before(() => {
            this.i = initSign(this.shakeMsg, this.nonce);
        });
        it('should return the keys',() => {
            expect(this.nonce[this.nonce.length-1]).to.be.greaterThan(0);
        });
    })
    describe('#signPush', () => {
        before(() => {
            this.i = msgPush(this.shakeMsg, Buffer.from(this.data1));
            this.ii = msgPush(this.shakeMsg, Buffer.from(this.data2));
       
        });
        it('should push data',() => {
            expect(this.i).to.be.equal(0);
            expect(this.ii).to.be.equal(0);
        });
    })
    describe('#signFinish', () => {
        before(() => {
            this.i = signFinish(this.sign, this.signLen, this.priKey, this.shakeMsg, this.nonce);
            this.b;
            (endianness() === "LE" ? this.b = Number(this.signLen.readBigUInt64LE()) : this.b = Number(this.signLen.readBigUInt64BE()));
            this.newSign = this.sign.slice(0,this.b);
        });
        it('should return signature',() => {
            expect(this.newSign[this.newSign.length-1]).to.be.greaterThan(0);
        });
    })
    describe('#initVerify', () => {
        before(() => {
            this.i = initVerify(this.shakeMsgVerify, this.newSign);
        });
        it('should return the msgStart',() => {
            expect(this.shakeMsg[0]).to.be.greaterThan(0);
        });
    });
    describe('#msgPush', () => {
        before(() => {
            this.i = msgPush(this.shakeMsgVerify, Buffer.from(this.data1));
            this.ii = msgPush(this.shakeMsgVerify, Buffer.from(this.data2));
       
        });
        it('should push data',() => {
            expect(this.i).to.be.equal(0);
            expect(this.ii).to.be.equal(0);
        });
    });
    describe('#verifyFinish', () => {
        before(() => {
            this.i = verifyFinish(this.newSign, this.pubKey, this.shakeMsgVerify);
        });
        it('should return valid',() => {
            expect(this.i).to.be.equal(0);
        });
    })
    
})
