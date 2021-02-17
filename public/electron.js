const { app, BrowserWindow, Notification } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: "file",
      slashes: "true"
    }))
  }
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
