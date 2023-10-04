const { spawn } = require('node:child_process')
const createProgress = require('./progress')

createLLamaProcess()

function createLLamaProcess() {
    const createProcess = spawn('local-llama')

    createProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
        // while data is being received, set the progress bar
        // when we are receiving data, we know the app is loading, so we add a temporary div to the results div
        if (data.includes('Local LLM loaded successfully')) {
            window.postMessage('server started', '*')
        }
    })

    createProcess.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`)
        if (data.includes('llama_model_loader:')) {
            // createProgress(win)
            window.postMessage('server starting', '*')
        }
        // when we've received the last message, we remove the temporary div
    })

    createProcess.on('close', (code) => {
        if (code === 0) {
            console.log(`child process exited successfully with code ${code}`)
        } else if (code === -4058 || code === 1) {
            // these are the 2 codes that that i found returned when the local-llama command was not found
            // there may be more, but i don't know what they are, so we take a chance and try to install local-llama anyway
            console.log('Maybe local-llama is not installed on your system?', code)
            installLocalllama()
        } else {
            console.error(`child process exited with an error code: ${code}`)
        }
    })

    createProcess.on('error', (err) => {
        console.error(`Failed to start child process: ${err.message}`)
    })
}

function installLocalllama() {
    window.postMessage('installing local-llama', '*')
    const installProcess = spawn('pip', ['install', 'local-llama'])

    installProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
    })

    installProcess.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`)
    })

    installProcess.on('close', (code) => {
        if (code === 0) {
            console.log(`child process exited successfully with code ${code}`)
            window.postMessage('successfully installed local-llama', '*')
            createLLamaProcess()
        } else {
            console.error(`child process exited with an error code: ${code}`)
            window.postMessage('failed to install local-llama', '*')
        }
    })

}

window.addEventListener('DOMContentLoaded', () => {
    // create dev tools
    // window.postMessage('ready', '*')
})
