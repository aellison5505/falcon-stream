
export function keygen(rngShake256: Buffer, publicKey: Buffer, privateKey: Buffer): number

export function startSign(rngShake256: Buffer, nonce: Buffer, msgShake256: Buffer): number

// falcon_sign_dyn_finish(s,sig.Data(), sigL, FALCON_SIG_COMPRESSED, sk.Data(), sk.Length(), m, n, &tmp, sizeof(tmp));

export function finalizeSign(rngShake256: Buffer, signature: Buffer, sigLength: Buffer, privateKey: Buffer, msgShake256: Buffer, nonce: Buffer): number;

export const PRIVKEY_SIZE:number

export const PUBKEY_SIZE: number

export const SIG_MAX: number

