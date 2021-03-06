// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Gifs = require('./gifs')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  if (process.env.ENVIRONMENT === 'dev') {
    mainWindow.webContents.openDevTools({ mode: 'undocked' })
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // For async calls
  ipcMain.handle('make-gifs', async (_, arg) => {
    console.log(arg)
    const generator = new Gifs(arg['fileName'], arg['subtitles'])
    return generator.generate()
  })

  // For syncronous calls, but probably not needed
  ipcMain.on('make-gifs', (event, arg) => {
    console.log(arg)
    const generator = new Gifs(arg['fileName'], arg['subtitles'])
    const ret = generator.generate()
    event.returnValue = ret
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
