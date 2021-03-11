const { app, BrowserWindow, Notification } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const background = require('./background');

function createWindow() {
  const iconPath = isDev
    ? path.join(__dirname, '..', 'public', 'favicon.ico')
    : path.join(__dirname, '..', 'build', 'favicon.ico');
  const win = new BrowserWindow({
    icon: iconPath,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: isDev,
      preload: path.join(__dirname, 'background', 'preload.js')
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, '..', 'build', 'index.html'),
      protocol: "file",
      slashes: "true"
    }))
  }

  background()
}

app.whenReady().then(createWindow)
  .then(() => {
    const nodeEnv = isDev ? 'development' : 'production';
    const notification = {
      title: `Notification of ${nodeEnv}`,
      body: `This is a ${nodeEnv} notification`
    }
    new Notification(notification).show()
  })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
