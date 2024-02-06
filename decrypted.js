const {
    scryptSync,
    createDecipheriv,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const encrypted = 'b8dcf717abf10b28c835b035ef14040e95df3ad81fdba441c31345b7fee81fac';



const algorithm = 'aes-192-cbc';
const password = 'My secret secret password qwerty12345 and not written on a monitor screen :)';
// Use the async `crypto.scrypt()` instead.
const key = '49e179deb38a0bd228bc5d99393440f2a0d9d7fa8916e46b';
// The IV is usually passed along with the ciphertext.
const iv = new Uint8Array(16); // Initialization vector.

const decipher = createDecipheriv(algorithm, key, iv);

// Encrypted using same algorithm, key and iv.

let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);