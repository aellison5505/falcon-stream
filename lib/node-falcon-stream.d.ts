
/**
 * Takes random Shake256 input, and fills key buffers.
 * 
 * @param rngShake256 Buffer pointer to shake256 random generator.
 * @param publicKey Buffer to hold public key
 * @param privateKey Buffer to hold private key
 * @returns 0 on success
 */
export declare function keygen(rngShake256: Buffer, publicKey: Buffer, privateKey: Buffer): number

/**
 * Initiates the start of the stream of data to sign. Fills nonce buffer and start the message stream.
 * 
 * @param rngShake256 Buffer pointer to shake256 random generator.
 * @param nonce Buffer to hold nonce
 * @param msgShake256 Buffer pointer to shake256 message stream.
 * @returns 0 on success
 */
export declare function startSign(rngShake256: Buffer, nonce: Buffer, msgShake256: Buffer): number

/**
 * Finishes the data stream, and creates the signature.  Fills the signature buffer,
 * snd sets the length of the signature in sigLength.
 * 
 * @param rngShake256 Buffer pointer to shake256 random generator.
 * @param signature Buffer to hold signature.
 * @param sigLength Buffer to hold size_t.
 * @param privateKey Buffer of the private key.
 * @param msgShake256 Buffer pointer to shake256 message stream.
 * @param nonce Buffer of nonce from startSign.
 * @returns 0 on success
 */
export declare function finalizeSign(rngShake256: Buffer, signature: Buffer, sigLength: Buffer, privateKey: Buffer, msgShake256: Buffer, nonce: Buffer): number;

export declare function startVerify( msgShake256: Buffer, signature: Buffer): number

export declare function finalizeVerify(signature: Buffer, publicKey: Buffer, msgShake256: Buffer): number;

export declare const PRIVKEY_SIZE:number

export declare const PUBKEY_SIZE: number

export declare const SIG_MAX: number

