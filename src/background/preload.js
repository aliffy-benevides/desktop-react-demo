const { ipcRenderer } = require('electron');

function preload() {
  window.isElectron = true
  window.ipcRenderer = ipcRenderer
}

preload()