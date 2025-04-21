// What if I ask you the following question — Give me an input string that outputs a SHA-256 hash that starts with 00000 . How will you do it?


const crypto = require('crypto');


let i = 1000;
let output;
while (i < 100000) {
    output = crypto.createHash('sha256').update(i.toString()).digest('hex');

    if (output.substring(0, 4) == '0000') {
        console.log(output);
        console.log(i)
    }
    // console.log(output.substring(0, 4));
    i = i + 1;
}