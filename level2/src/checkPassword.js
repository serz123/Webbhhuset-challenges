export function checkPassword(password) {
    // Rule 1: At least three vowels
    const vowels = "aeiou"
    let vowelCount = 0
    for (let i = 0; i < password.length; i++) {
        if (vowels.includes(password[i])) {
            vowelCount++
        }
    }
    if (vowelCount < 3) {
        return false
    }

    // Rule 2: At least one letter that appears twice in a row
    let hasDoubleLetter = false
    for (let i = 0; i < password.length - 1; i++) {
        if (password[i] === password[i + 1]) {
            hasDoubleLetter = true
            break
        }
    }
    if (!hasDoubleLetter) {
        return false
    }

    // Rule 3: Does not contain "ab", "cd", "pq", or "xy"
    const forbiddenSubstrings = ["ab", "cd", "pq", "xy"]
    for (let substring of forbiddenSubstrings) {
        if (password.includes(substring)) {
            return false
        }
    }

    return true
}