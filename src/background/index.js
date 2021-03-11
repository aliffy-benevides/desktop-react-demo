const { ipcMain } = require("electron")

module.exports = function background() {
  ipcMain.on('ping', (event, arg) => {
    event.reply('pong', arg + 1)
  })
}