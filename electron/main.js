// ./public/electron.js
const path = require('path');
const { app, BrowserWindow, ipcMain, dialog} = require('electron');
const isDev = require('electron-is-dev');
global.share = {ipcMain};

require('./Ipcs')
const fs = require("fs");
const pdf = require("pdf-parse");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration : false,
      preload: path.join(__dirname, './preload.js')
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


ipcMain.handle("parsePdfContent", async (e, a) => {
  let dialogData  =  await dialog.showOpenDialog({ properties: ['openFile'], filters : [{ name: 'Pdf', extensions: ['pdf'] }] })
 
  if(dialogData.filePaths[0] !== undefined){
    const filePath = dialogData.filePaths[0];
    let pdfDataInBuffer = fs.readFileSync(filePath);
    let pdfText = [filePath];
    let pdfData = await pdf(pdfDataInBuffer);
    
    let pdfTextInArray =  pdfText.concat((pdfData.text.split("\n")));

    return {
      name : filePath,
      text: pdfTextInArray,
      buffer: pdfDataInBuffer
    };
  }
  
  return {
    name : 'No file selected',
    text: [],
    buffer: null
  }
})



app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});