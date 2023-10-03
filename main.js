const { app, BrowserWindow } = require('electron')
const { create } = require('node:domain')
// include the Node.js 'path' module at the top of your file
const path = require('node:path')

const createProgress = require('./progress')

// modify your existing createWindow() function
const createWindow = () => {
    const win = new BrowserWindow({
    titleBarStyle: 'default',
    autoHideMenuBar: true,
    transparent: true,
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
       nodeIntegration: true,
       contentSecurityPolicy: `
      default-src 'self';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      style-src-elem 'self' https://fonts.googleapis.com;
      connect-src 'self' http://127.0.0.1:8000; // Add your server URL(s)
`,
    }
  })

  win.loadFile('index.html')

  // open dev tools
  win.webContents.openDevTools()

    // createProgress(win)
    return win
}

app.whenReady().then(() => {
  createWindow()
//   add dev tools
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})