const electron = require('electron')
const path = require('path')
const axios = require('axios');


const BrowserWindow = electron.remote.BrowserWindow

const notifyBtn = document.getElementById('notifyBtn')

notifyBtn.addEventListener('click', function (event) {
  const modalPath = path.join('file://', __dirname, 'add.html')
  let win = new BrowserWindow({ 
                            frame:false, 
                            transparent: true, 
                            alwaysOnTop: true,
                            width: 400, 
                            height: 200 
    })
  win.on('close', function () { win = null })
  win.loadURL(modalPath)
  win.show()

})
var price = document.getElementById('price')
var targetPrice = document.getElementById('targetPrice')
// Other const's removed for brevity
const ipc = electron.ipcRenderer

var price = document.getElementById('price')

// Add these two variables
var targetPriceVal;
var targetPrice = document.getElementById('targetPrice')
var notified = false

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
    notified = false
})

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$'+cryptos.toLocaleString('en')
        
        if (targetPrice.innerHTML != '' && targetPriceVal <= res.data.BTC.USD && !notified) {
            const myNotification = new window.Notification(notification.title, notification)
            notified=true;
        }
    })
}
getBTC();
setInterval ( getBTC, 30);