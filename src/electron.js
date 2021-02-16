const { app, BrowserWindow, Notification } = require('electron');
const net = require('net');

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
    
  }
}

app.whenReady().then(createWindow)
  .then(() => {
    const notification = {
      title: 'Basic Notification',
      body: 'Notification from the Main process'
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
