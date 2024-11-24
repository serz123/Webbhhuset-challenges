import { secureHashing } from './hashing.js'

const hashedPassword = secureHashing('Password123!')
console.log('Hashed password:', hashedPassword)
