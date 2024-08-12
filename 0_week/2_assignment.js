// same problem with a prefix
const crypto = require('crypto');


let i = 1000;
let output;
while (i < 100000) {
    output = crypto.createHash('sha256').update('abcd' + i.toString()).digest('hex');

    if (output.substring(0, 4) == '0000') {
        console.log(output);
        console.log(i);
        break;
    }
    // console.log(output.substring(0, 4));
    i = i + 1;
}