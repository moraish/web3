let str = 'h';

const binaryRepresentatiob = new TextEncoder().encode(str);
console.log(binaryRepresentatiob);

const publicKey = '34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo'
const encryptedKey = new TextEncoder().encode(publicKey);
console.log(encryptedKey);