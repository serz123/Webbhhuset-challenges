import { checkPassword } from "./checkPassword.js"
import fse from 'fs-extra'
import readline from 'readline'

// Async function to read the file line by line and check each line
export async function processFile(filePath) {
    let secureCount = 0
    try {
        const fileStream = fse.createReadStream(filePath, 'utf8')
        const rl = readline.createInterface({
            input: fileStream,
            output: process.stdout,
            terminal: false
        })

        // Process each line asynchronously
        for await (const line of rl) {
            const isValid = await checkPassword(line)
            if (isValid) {
                secureCount++
            }
        }
    } catch (err) {
        console.error('Error reading the file:', err)
    }
    return secureCount
}
