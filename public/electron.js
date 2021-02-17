const { app, BrowserWindow, Notification } = require('electron');
const net = require('net');
const path = require('path');
const url = require('url');

// Function used for development
function waitForReact(port) {
  const client = new net.Socket();

  return new Promise((resolve, reject) => {
    let startedElectron = false;
    const tryConnection = () => client.connect({ port }, () => {
      client.end();
      if (!startedElectron) {
        startedElectron = true;
        resolve();
      }
    });
    
    tryConnection();
    
    client.on('error', (error) => {
      setTimeout(tryConnection, 1000);
    });
  })
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

    waitForReact(port)
      .then(() => {
        win.loadURL(`http://localhost:${port}`)
        win.webContents.openDevTools()
      })
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
    const notification = {
      title: `Notification of ${process.env.NODE_ENV}`,
      body: `This is a ${process.env.NODE_ENV} notification`
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
