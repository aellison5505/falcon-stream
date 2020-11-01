
export function keygen(rngShake256: Buffer, publicKey: Buffer, privateKey: Buffer): number

export function startSign(rngShake256: Buffer, nonce: Buffer, msgShake256: Buffer): number

export const PRIVKEY_SIZE:number

export const PUBKEY_SIZE: number

export const SIG_MAX: number

