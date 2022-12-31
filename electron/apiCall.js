const{dialog} = require("electron");
const fs = require("fs");
const pdf = require ("pdf-parse");


module.exports = {
    parsePdfContent : global.share.ipcMain.handle("parsePdfContent", async (e,a) =>{
        let result = await  dialog.showOpenDialog({ properties: ['openFile'], filters : [{ name: 'Pdf', extensions: ['pdf'] }] })

        let pdfDataInBuffer = fs.readFileSync(result.filePaths[0]);
        let pdfText = ["No information ussable"]

        let pdfData = await pdf(pdfDataInBuffer);
        
        return pdfData.text.split("\n");
    })
}

