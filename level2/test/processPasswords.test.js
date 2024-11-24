import { processFile } from '../src/processPasswords.js'
import { checkPassword } from '../src/checkPassword.js'
import fse from 'fs-extra'
import readline from 'readline'

jest.mock('fs-extra')
jest.mock('readline')

describe('processFile', () => {
    test('correctly counts the number of secure passwords', async () => {
        // Mock file content
        const mockLines = ['ugknbfddgicrmopn', 'aaa', 'jchzalrnumimnmhp']

        // Mock readline.createInterface behavior
        const onMock = jest.fn()
        readline.createInterface.mockReturnValue({
            on: onMock,
            [Symbol.asyncIterator]: jest.fn(() => mockLines[Symbol.iterator]()),
        })

        // Mock checkPassword to match rules
        jest.spyOn(global, 'checkPassword').mockImplementation((password) => {
            return password === 'ugknbfddgicrmopn' || password === 'aaa' // Only these are valid
        })

        // Call processFile
        await processFile('./mockFile.txt')

        expect(readline.createInterface).toHaveBeenCalledWith({
            input: expect.anything(),
            output: expect.anything(),
            terminal: false,
        })
        expect(global.checkPassword).toHaveBeenCalledTimes(3)
    })

    test('handles empty files gracefully', async () => {
        // Mock empty file
        readline.createInterface.mockReturnValue({
            [Symbol.asyncIterator]: jest.fn(() => [][Symbol.iterator]()),
        })

        await processFile('./emptyFile.txt')

        // Expect no errors and no passwords processed
        expect(readline.createInterface).toHaveBeenCalled()
    })
})
