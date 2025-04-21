const crypto = require('crypto');

let i = 0;
let hash;
while (i < 1000000) {
    hash = crypto.createHash('sha256').update(i.toString()).digest('hex');
    if (hash.substring(0, 5) == '00000') {
        console.log(hash)
        break
    }
    i = i + 1
}