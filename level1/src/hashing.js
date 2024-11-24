import crypto from 'crypto'

function hashSHA1(input) {
    return crypto.createHash('sha1').update(input).digest('hex')
}

function hashMD5(input) {
    return crypto.createHash('md5').update(input).digest('hex')
}

export function secureHashing(password) {
    // 1. Hash with SHA-1
    let currentHash = hashSHA1(password)

    // Repeat step 2 (100 times)
    for (let i = 0; i < 100; i++) {
        const firstChar = currentHash[0]
        const lastChar = currentHash[currentHash.length - 1]

        // 2. Combine first and last char to hexadecimal word
        const hexValue = parseInt(firstChar + lastChar, 16)

        // Step 2.
        if (hexValue < 128) {
            currentHash = hashSHA1(currentHash)
        } else {
            currentHash = hashMD5(currentHash)
        }
    }

    return currentHash
}
