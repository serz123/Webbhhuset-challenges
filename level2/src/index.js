import { processFile } from "./processPasswords.js"
import crypto from 'crypto'
import fetch from 'node-fetch'

const answerNumber = await processFile('../level2/data/passwords.txt')
const answer = answerNumber.toString()
const signingKey = 'xG9HlwoVJeA2'

function generateHmacSignature(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex')
}

// Generate the signature for the answer
const signature = generateHmacSignature(signingKey, answer)

export async function submitAnswer(answer, signature) {
    const url = 'https://webbhuset.se/employment-challenge/answer'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'X-Signature': signature,
            'Content-Type': 'text/plain',
        },
        body: answer,
    })

    if (!response.ok) {
        throw new Error(`Failed to submit answer: ${response.statusText}`)
    }

    const responseBody = await response.text()
    console.log('Response:', responseBody)
}

// Execute the submission
submitAnswer(answer, signature)
    .then(() => console.log('Answer submitted successfully'))
    .catch(err => console.error('Error:', err))
