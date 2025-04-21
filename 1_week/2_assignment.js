const crypto = require('crypto');

const prefix = '100xdevs'
// const nonce = '2274885'

// const ans = crypto.createHash('sha256').update(prefix + nonce).digest('hex');

// console.log(ans)

let i = 0;
let hashed;
while (i < 1000000) {
    hashed = crypto.createHash('sha256').update(prefix + i.toString()).digest('hex');
    if (hashed.substring(0, 4) == '0000') {
        console.log(i)
        console.log(hashed)
        break
    }
    i = i + 1;
}