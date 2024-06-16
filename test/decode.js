const meow = require("../meow.js"); // import the library

const encoded = process.argv.slice(2).join(' '); // retrieves the encoded message 

console.log(meow.decode(encoded)); // decodes the message and displays it on the console