/*
    MIT License
    
    Copyright (c) 2024 Yvain Ramora
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

class meow {

    /**
     * function for encoding
     * @param {string} message - The message to be encoded
     * @returns {string} - The encoded message
    */
    static encode(message) {
        let meow = '';

        /* cuts each character to encode them one by one */
        message.split('').forEach(char => {
            char = char.charCodeAt();

            /* configures the padding according to the ASCII or unicode character */
            const padding = char >= 0x0 && char <= 0xFF ? 8 : 16;

            /* converts the character to binary */
            const bits = char.toString(2).padStart(padding, '0');
            let meowChar = '';

            /* encodes each bit, a 0 is a lowercase letter, a 1 is an uppercase letter */
            for (let i = 0; i < bits.length; i++) {
                bits[i] == '1' ? meowChar += 'MEOW'.repeat(padding / 4)[i] : meowChar += 'meow'.repeat(padding / 4)[i];
            }

            /* adds the new encoded character and adds a prefix for unicode characters */
            meow += (padding == 8 ? ' ' : ' grrr ') + meowChar.match(/meow/gi).join(" ")

        });

        /* returns the encoded message */
        return meow.replace(' ', '');
    }

    /**
     * function for decoding
     * @param {string} meow - The message to be decoded
     * @returns {string} - The decoded message
    */
    static decode(meow) {
        let message = '';

        /* retrieves each encoded character */
        const meowChars = meow.match(/(grrr (meow( |)){4})|(meow( |)){2}|(.)/gi);
        if (meowChars) {

            /* cuts each encoded character to decode them one by one */
            meowChars.forEach(meowChar => {

                /* removes the prefix from unicode characters */
                meowChar = meowChar.replace('grrr ', '')

                /* checks that the character has been encoded correctly */
                if (meowChar.match(/(meow( |)){4}|(meow( |)){2}/i)) {
                    let bits = '';
                    meowChar = meowChar.split(' ').join('');

                    /* replaces uppercase letters with 1 and lowercase letters with 0 */
                    for (let i = 0; i < meowChar.length; i++) {
                        meowChar[i].match(/[MEOW]/) ? bits += '1' : bits += '0';
                    }

                    /* converts the binary character into a readable character */
                    message += String.fromCharCode(parseInt(bits, 2));
                } else {

                    /* if the character is not encoded, then add it directly to the message */
                    message += meowChar;
                }
            })
        }

        /* returns the decoded message */
        return message;
    }
}

module.exports = meow;