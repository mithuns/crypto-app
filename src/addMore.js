const electron = require('electron')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function (event) {
  console.log("do we even get here")
  var window = remote.getCurrentWindow();
  window.close();
})

const addStockBtn = document.getElementById('addStockBtn')

addStockBtn.addEventListener('click', function () {
  
  ipc.send('addNewStock', document.getElementById('stockName').value)
  var window = remote.getCurrentWindow();
  window.close();
})

