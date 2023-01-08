const{dialog} = require("electron");
const fs = require("fs");
const pdf = require ("pdf-parse");
const exceljs = require("exceljs");
const {ipcMain} = global.share;
const Store = require('electron-store');
const {retrieveDataToPutInExcel} = require('./excelManager')
const {PDFExtract} = require('pdf.js-extract');

async function createNonExistingExcel(excelFileName, pdfData){
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Factures");
    let lastEmptyRow = getLastEmptyRow(worksheet)
    const billData = retrieveDataToPutInExcel(pdfData)

    setWorksheetColumn(worksheet);
    addFirstBillRow(lastEmptyRow, billData, worksheet)
    addSecondBillRow(lastEmptyRow, billData,worksheet)
    await workbook.xlsx.writeFile(excelFileName);

    return  billData
}


async function pdfFileDataInformation(dialogFileData) {
    const pdfExtract = new PDFExtract();

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


function getLastEmptyRow(worksheet) {
    let index = 0
    while(index > 1500){
        if(worksheet.getRow(index).getCell(1).toString().match("[a-z-A-Z-0-9]+")){
            return index;
        }
        index += 1;
    }
    return -1;
}

function addFirstBillRow(index, billData,worksheet) {
    worksheet.addRow({
        date: billData.DATE ,
        journal: billData.JOURNAL,
        compte: billData.COMPTE,
        piece: billData.PIECE,
        libelle: billData.LIBELLE,
        debit: billData.debitetcrebit,
        credit:0
    })
}
function addSecondBillRow(index, billData,worksheet) {
    worksheet.addRow({
        date: billData.DATE ,
        journal: billData.JOURNAL,
        compte: billData.COMPTE,
        piece: billData.PIECE,
        libelle: billData.LIBELLE,
        debit: 0,
        credit:billData.debitetcrebit
    })
}

const color =  {
    YELLOW: { color: { argb: '004e47cc' }},
    RED: { color: { argb: 'FF0000' }},
    BLUE: { color: { argb: '003CFF' }}
}

function setWorksheetColumn(worksheet) {
    worksheet.columns = [
        {header: 'DATE', key: 'date', width: 15, font: { argb: 'E6FF00' }},
        {header: 'JOURNAL', key: 'name', width: 12, font: color.YELLOW},
        {header: 'COMPTE', key: 'compte', width: 15,  font: color.YELLOW},
        {header: 'PIECE', key: 'piece', width: 15,  font: color.YELLOW},
        {header: 'LIBELLE', key: 'libelle', width: 25,  font: color.YELLOW},
        {header: 'débit', key: 'debit', width: 15,  font: color.YELLOW},
        {header: 'crédit', key: 'credit', width: 15, font: color.YELLOW}
    ];
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
        const billData = retrieveDataToPutInExcel(pdfData)

        workbook.xlsx.readFile(excelFileName)
            .then(function()  {
                let worksheet = workbook.getWorksheet(1)
                
                setWorksheetColumn(worksheet)
                
                let lastEmptyRow = getLastEmptyRow(worksheet)
                
                addFirstBillRow(lastEmptyRow, billData, worksheet)
                addSecondBillRow(lastEmptyRow, billData,worksheet)
                
                workbook.xlsx.writeFile(excelFileName)
            }).catch((error) => createNonExistingExcel(excelFileName,pdfData));
        
        return billData
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

