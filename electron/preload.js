const { contextBridge, ipcRenderer } =  require ('electron');

contextBridge.exposeInMainWorld("api", {
    parsePdfContent: (arg) => ipcRenderer.invoke("parsePdfContent")
})