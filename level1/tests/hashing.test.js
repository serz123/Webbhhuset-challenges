import { secureHashing } from '../src/hashing'

describe('secureHashing function', () => {

  test('should return a hashed value for password "password1"', () => {
    const hashedPassword = secureHashing('password1')
    const expectedHash = '70510d02bcff092061212824b494b79034d3cbe4'
    expect(hashedPassword).toBe(expectedHash)
  })

  test('should return a different hash for different passwords', () => {
    const hash1 = secureHashing('Password123!')
    const hash2 = secureHashing('DifferentPassword!')

    expect(hash1).not.toBe(hash2)
  })

  test('should return same hash for same input', () => {
    const hash1 = secureHashing('Password123!')
    const hash2 = secureHashing('Password123!')
    
    expect(hash1).toBe(hash2)
  })

  test('should handle empty password input', () => {
    const hash = secureHashing('')
    
    const expectedHashForEmpty = 'dc0b0791d6b6a4d9642260bc3fa037bc1e3b6d60' 
    expect(hash).toBe(expectedHashForEmpty)
  })

})
