const { spawn } = require('node:child_process')
const createProgress = require('./progress')

const createProcess = spawn('local-llama')

createProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
    // while data is being received, set the progress bar
    })

createProcess.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
    // while data is being received, canel the progress bar

    }
)

createProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
    }
)

window.addEventListener('DOMContentLoaded', () => {
    // create dev tools
})
