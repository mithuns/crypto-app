const electron = require('electron')
const {dialog} = require('electron').remote

const path = require('path')
const axios = require('axios');
var mystock = require('./getStockPrice.js');
const ipc = electron.ipcRenderer
const BrowserWindow = electron.remote.BrowserWindow
var stocksCollection = new Object();

function addListener(elem, htmlPage){
    elem.addEventListener('click', function (event) {
        const modalPath = path.join('file://', __dirname, htmlPage)
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
}

ipc.on('addNewStock', async function (event, arg) {
    var obj = await mystock.getStockPrice(arg);
    if(obj.quotes.unmatched_symbols){
        console.log("symbol not found");
        dialog.showErrorBox('Alert','Symbol not found');
    }else{
        var mainTable = document.getElementById('mainTable');
        var newRow = mainTable.insertRow(rowCount);
        var stockName = newRow.insertCell(0);
        var stockSymbol =  newRow.insertCell(1);
        var stockPrice =  newRow.insertCell(2);
        stocksCollection[arg+''] = newRow;
        stockName.innerHTML = obj.quotes.quote.description;
        stockSymbol.innerHTML = obj.quotes.quote.symbol;
        stockPrice.innerHTML = obj.quotes.quote.ask;
        rowCount++;
    }    
})

var rowCount = 1

function createTable(){
    var parentElement = document.getElementById('addMore')
    var mainTable = document.createElement("TABLE");
    mainTable.setAttribute("id","mainTable");
    var header = mainTable.createTHead();
    var row = header.insertRow(0);     
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "<b>Stock Name</b>";
    cell2.innerHTML = "<b>Stock Symbol</b>";
    cell3.innerHTML = "<b>Current Price</b>";
    
    parentElement.appendChild(mainTable);
    
    var addMoreBtn = document.createElement("BUTTON");
    addMoreBtn.setAttribute("id","addMoreBtn");
    addMoreBtn.setAttribute("value","Add more");
    addMoreBtn.innerHTML = "Add more";
    parentElement.appendChild(addMoreBtn);
    addListener(document.getElementById('addMoreBtn'),"addMore.html")
}

function updatePrices() {
    // your function code here
    var hours = new Date().getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';

    console.log(ampm);
    if(Object.keys(stocksCollection).length>0){
        console.log("Do something about these");
    }
    console.log("this should get logged");
    setTimeout(updatePrices, 5000);
}

updatePrices();