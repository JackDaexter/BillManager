const{dialog} = require("electron");
const fs = require("fs");
const pdf = require ("pdf-parse");
const exceljs = require("exceljs");
const {ipcMain} = global.share;
const Store = require('electron-store');
const {retrieveDataToPutInExcel} = require('./excelManager')

async function createNonExistingExcel(){
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");

    worksheet.columns = [
        {header: 'DATE', key: 'id', width: 10},
        {header: 'JOURNAL', key: 'name', width: 32},
        {header: 'COMPTE', key: 'compte', width: 15},
        {header: 'PIECE', key: 'piece', width: 15},
        {header: 'LIBELLE', key: 'libelle', width: 15},
        {header: 'débit', key: 'debit', width: 15},
        {header: 'crédit', key: 'credit', width: 15}
    ];

    await workbook.xlsx.writeFile('export.xlsx');

}


async function pdfFileDataInformation(dialogFileData) {
    const pdfFileInfo = dialogFileData.filePaths[0];
    let pdfDataInBuffer = fs.readFileSync(pdfFileInfo);
    let pdfContent = await pdf(pdfDataInBuffer);

    let pdfContentInArray = pdfContent.text.split("\n");

    let lastSplitIndex = pdfFileInfo.lastIndexOf("\\");
    const filePath = pdfFileInfo.slice(0, lastSplitIndex);

    return {
        name: pdfFileInfo,
        text: pdfContentInArray,
        pdfPath: filePath,
        buffer: pdfDataInBuffer
    }
}


module.exports = {
    parsePdf : ipcMain.handle("parsePdfContent", async (e, a) =>{
        let dialogFileData  =  await dialog.showOpenDialog({ properties: ['openFile'], filters : [{ name: 'Pdf', extensions: ['pdf'] }] })

        if(dialogFileData.filePaths[0] !== undefined){
            return await pdfFileDataInformation(dialogFileData);
        }

        return {
            name : 'No file selected',
            text: [],
            pdfPath  : null,
            buffer: null
        }
    }),

    writeParsedDataInExcel : ipcMain.handle('writeParsedDataInExcel', async  (events,excelFileName,pdfData) => {
        const workbook = new exceljs.Workbook();
        workbook.xlsx.readFile(excelFileName)
            .then(function()  {
                const billData = retrieveDataToPutInExcel(pdfData)
           /*     const worksheet = workbook.getWorksheet(2);
                const lastRow = worksheet.lastRow;
                const getRowInsert = worksheet.getRow(++(lastRow.number));
                getRowInsert.getCell('A').value = 'yo';
                getRowInsert.commit();
                return workbook.xlsx.writeFile(excelFileName);*/
            }).catch(createNonExistingExcel);
    }),
    
    selectExcelFile : ipcMain.handle('selectExcelFile', async  (event,args) => {
        let dialogFileData  =  await dialog.showOpenDialog({ properties: ['openFile'], filters : [{ name: 'Excel', extensions: ['xlsx','xlsm'] }] })
       
        if(dialogFileData.canceled === false){
            return dialogFileData.filePaths[0];
        }

        return undefined
    }),
    
    saveExcelFileNameInLocalDb : ipcMain.handle('saveExcelFileNameInLocalDb', async  (event,args) => {
        const store = new Store();
        store.set('excelFileName', args);
    }),
    
    checkIfExcelFileHasBeenSelectedPreviously : ipcMain.handle('checkIfExcelFileHasBeenSelectedPreviously', async  (event,args) => {
        const store = new Store();
        return store.get('excelFileName');
    })
}

