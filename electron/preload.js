const { contextBridge, ipcRenderer } =  require ('electron');
const api = "api"

contextBridge.exposeInMainWorld(api, {
    parsePdfContent: (channel, data) => ipcRenderer.invoke("parsePdfContent"),
    writeInExcel: (channel, data) => ipcRenderer.invoke("writeInExcel"),
    
})