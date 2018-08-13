const electron = require('electron')
const path = require('path')
const axios = require('axios');

const ipc = electron.ipcRenderer


const BrowserWindow = electron.remote.BrowserWindow

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
ipc.on('addNewStock', function (event, arg) {
    
    var mainTable = document.getElementById('mainTable')
    var newRow = mainTable.insertRow(rowCount);
    var stockName = newRow.insertCell(0)
    var stockSymbol =  newRow.insertCell(1)
    var stockPrice =  newRow.insertCell(2)
    stockName.innerHTML = arg;
    stockSymbol.innerHTML = 'to be fetched by a service'
    stockPrice.innerHTML = '$ to be retrieved'
    rowCount++;
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