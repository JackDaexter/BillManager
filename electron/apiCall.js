const{dialog} = require("electron");
const fs = require("fs");
const pdf = require ("pdf-parse");
const exceljs = require("exceljs");
const {ipcMain} = global.share;

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

module.exports = {
    parsePdf : ipcMain.handle("parsePdfContent", async (e, a) =>{
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
    }),
    
    writeExcel : ipcMain.handle('writeInExcel', async  (event,args) => {
        let nameFileExcel = 'cc2.xlsx'
        const workbook = new exceljs.Workbook();
        workbook.xlsx.readFile(nameFileExcel)
            .then(function()  {
                const worksheet = workbook.getWorksheet(2);
                const lastRow = worksheet.lastRow;
                const getRowInsert = worksheet.getRow(++(lastRow.number));
                getRowInsert.getCell('A').value = 'yo';
                getRowInsert.commit();
                return workbook.xlsx.writeFile(nameFileExcel);
            }).catch(createNonExistingExcel);
    })
}

