const { Keypair } = require("@solana/web3.js");
const nacl = require("tweetnacl");
const keypair = Keypair.generate();

// 1. Generating a keyPair
const publicKey = keypair.publicKey.toBase58();
console.log(publicKey);

const secretKey = keypair.secretKey;
console.log(secretKey);

// 2. Encoding a message
const message = new TextEncoder().encode(`Send 100 SOL to ${publicKey}`);
console.log(`Message -> ${message}`)
// 3. Signing a message
const signature = nacl.sign.detached(message, secretKey);
console.log(`Signature -> ${signature}`)

// 4. Verify a message
const result = nacl.sign.detached.verify(
    message, signature, keypair.publicKey.toBytes()
)

console.log(result);