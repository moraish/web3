var greet = "hello";

let greet_ascii = greet.charCodeAt(0); // converts to ascii
console.log(greet_ascii);
let greet_bits = greet_ascii.toString(2);
console.log(greet_bits);


function strToBinary(s) {
    let i = 0;
    let ascii;
    let binary;
    let arr = [];
    while (i < s.length) {
        ascii = s.charCodeAt(i);
        binary = ascii.toString(2);
        arr.push(binary);
        i = i + 1;
    }
    return arr;
}

console.log(strToBinary('hello'))