import { checkPassword } from '../src/checkPassword.js'

describe('checkPassword', () => {
    test('returns true for a secure password', () => {
        const result = checkPassword('ugknbfddgicrmopn')
        expect(result).toBe(true)
    })

    test('returns false for a password with less than three vowels', () => {
        const result = checkPassword('dvszwmarrgswjxmb') // Only 1 vowel
        expect(result).toBe(false)
    })

    test('returns false for a password without double letters', () => {
        const result = checkPassword('jchzalrnumimnmhp')
        expect(result).toBe(false)
    })

    test('returns false for a password containing forbidden substrings', () => {
        const result = checkPassword('haegwjzuvuyypxyu') // Contains "xy"
        expect(result).toBe(false)
    })

    test('handles passwords with overlapping conditions correctly', () => {
        const result = checkPassword('aaa') // 3 vowels, double "a", valid
        expect(result).toBe(true)
    })

    test('returns false for an empty password', () => {
        const result = checkPassword('')
        expect(result).toBe(false)
    })
})
