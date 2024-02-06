const {
    scrypt,
    randomFill,
    createCipheriv,
    createDecipheriv,
    getCiphers
} = require('node:crypto');


// const data = getCiphers();
// console.log(JSON.stringify(data, null, 4));

const ciphers = [
    "aes-128-cbc",
    "aes-128-cbc-hmac-sha1",
    "aes-128-cbc-hmac-sha256",
    "aes-128-ccm",
    "aes-128-cfb",
    "aes-128-cfb1",
    "aes-128-cfb8",
    "aes-128-ctr",
    "aes-128-ecb",
    "aes-128-gcm",
    "aes-128-ocb",
    "aes-128-ofb",
    "aes-128-xts",
    "aes-192-cbc",
    "aes-192-ccm",
    "aes-192-cfb",
    "aes-192-cfb1",
    "aes-192-cfb8",
    "aes-192-ctr",
    "aes-192-ecb",
    "aes-192-gcm",
    "aes-192-ocb",
    "aes-192-ofb",
    "aes-256-cbc",
    "aes-256-cbc-hmac-sha1",
    "aes-256-cbc-hmac-sha256",
    "aes-256-ccm",
    "aes-256-cfb",
    "aes-256-cfb1",
    "aes-256-cfb8",
    "aes-256-ctr",
    "aes-256-ecb",
    "aes-256-gcm",
    "aes-256-ocb",
    "aes-256-ofb",
    "aes-256-xts",
    "aes128",
    "aes128-wrap",
    "aes192",
    "aes192-wrap",
    "aes256",
    "aes256-wrap",
    "aria-128-cbc",
    "aria-128-ccm",
    "aria-128-cfb",
    "aria-128-cfb1",
    "aria-128-cfb8",
    "aria-128-ctr",
    "aria-128-ecb",
    "aria-128-gcm",
    "aria-128-ofb",
    "aria-192-cbc",
    "aria-192-ccm",
    "aria-192-cfb",
    "aria-192-cfb1",
    "aria-192-cfb8",
    "aria-192-ctr",
    "aria-192-ecb",
    "aria-192-gcm",
    "aria-192-ofb",
    "aria-256-cbc",
    "aria-256-ccm",
    "aria-256-cfb",
    "aria-256-cfb1",
    "aria-256-cfb8",
    "aria-256-ctr",
    "aria-256-ecb",
    "aria-256-gcm",
    "aria-256-ofb",
    "aria128",
    "aria192",
    "aria256",
    "camellia-128-cbc",
    "camellia-128-cfb",
    "camellia-128-cfb1",
    "camellia-128-cfb8",
    "camellia-128-ctr",
    "camellia-128-ecb",
    "camellia-128-ofb",
    "camellia-192-cbc",
    "camellia-192-cfb",
    "camellia-192-cfb1",
    "camellia-192-cfb8",
    "camellia-192-ctr",
    "camellia-192-ecb",
    "camellia-192-ofb",
    "camellia-256-cbc",
    "camellia-256-cfb",
    "camellia-256-cfb1",
    "camellia-256-cfb8",
    "camellia-256-ctr",
    "camellia-256-ecb",
    "camellia-256-ofb",
    "camellia128",
    "camellia192",
    "camellia256",
    "chacha20",
    "chacha20-poly1305",
    "des-ede",
    "des-ede-cbc",
    "des-ede-cfb",
    "des-ede-ecb",
    "des-ede-ofb",
    "des-ede3",
    "des-ede3-cbc",
    "des-ede3-cfb",
    "des-ede3-cfb1",
    "des-ede3-cfb8",
    "des-ede3-ecb",
    "des-ede3-ofb",
    "des3",
    "des3-wrap",
    "id-aes128-CCM",
    "id-aes128-GCM",
    "id-aes128-wrap",
    "id-aes128-wrap-pad",
    "id-aes192-CCM",
    "id-aes192-GCM",
    "id-aes192-wrap",
    "id-aes192-wrap-pad",
    "id-aes256-CCM",
    "id-aes256-GCM",
    "id-aes256-wrap",
    "id-aes256-wrap-pad",
    "id-smime-alg-CMS3DESwrap",
    "sm4",
    "sm4-cbc",
    "sm4-cfb",
    "sm4-ctr",
    "sm4-ecb",
    "sm4-ofb"
]


//szyfrowanie
const algorithm = 'aes-192-cbc';
const password = 'My secret secret password qwerty12345 and not written on a monitor screen :)';

const text = 'p@ssword secret of course :)';
// let text = { "id": 67823344, "text": "text to be encrypted by the algorithm" };
// text = JSON.stringify(text); console.log(text);

// First, we'll generate the key. The key length is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
// scrypt(password, 'salt', 24, (err, key) => {
//     if (err) throw err;
//     // Then, we'll generate a random initialization vector
//     randomFill(new Uint8Array(16), (err, iv) => {
//         if (err) throw err;

//         // Once we have the key and iv, we can create and use the cipher...
//         const cipher = createCipheriv(algorithm, key, iv);

//         let encrypted = '';
//         cipher.setEncoding('hex');

//         cipher.on('data', (chunk) => encrypted += chunk);
//         cipher.on('end', () => console.log(encrypted));

//         cipher.write(text);
//         cipher.end();
//     });
// });


//with update ad final
scrypt(password, 'salt', 24, (err, key) => {
    if (err) throw err;
    // Then, we'll generate a random initialization vector
    randomFill(new Uint8Array(16), (err, iv) => {
        if (err) throw err;
        console.log('key: ', key.toString('hex'));
        console.log('iv: ', iv);
        const cipher = createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        console.log(`encrypted ${text} : `, encrypted);

        const decipher = createDecipheriv(algorithm, key, iv);

        // Encrypted using same algorithm, key and iv.

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        console.log('decrypted: ', decrypted);
    });
});
