const meow = require("../meow.js"); // import the library

const message = process.argv.slice(2).join(' '); // retrieves the message 

console.log(meow.encode(message)); // encodes the message and displays it on the console