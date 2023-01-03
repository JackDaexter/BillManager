const { contextBridge, ipcRenderer } =  require ('electron');
const api = "api"

contextBridge.exposeInMainWorld(api, {
    parsePdfContent: (data) => ipcRenderer.invoke("parsePdfContent"),
    writeParsedDataInExcel: (events, excelFileName, pdfData) => ipcRenderer.invoke("writeParsedDataInExcel",events,excelFileName, pdfData),
    checkIfExcelFileHasBeenSelectedPreviously: (data) => ipcRenderer.invoke("checkIfExcelFileHasBeenSelectedPreviously",data),
    selectExcelFile: (data) => ipcRenderer.invoke("selectExcelFile"),
    saveExcelFileNameInLocalDb: (data) => ipcRenderer.invoke("saveExcelFileNameInLocalDb", data),
    
})