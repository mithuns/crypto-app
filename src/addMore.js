const electron = require('electron')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function (event) {
  console.log("do we even get here")
  var window = remote.getCurrentWindow();
  window.close();
})

const addStockBtn = document.getElementById('addStockBtn');

addStockBtn.addEventListener('click', function () {
  var stockName = document.getElementById('stockName').value
  if(stockName)
  {
    ipc.send('addNewStock', stockName);
  }
  var window = remote.getCurrentWindow();
  window.close();
},{once:true});

