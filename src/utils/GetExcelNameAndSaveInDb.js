export const getExcelNameAndSaveInDb = async () => {
    const excelFilePath = await window.api.selectExcelFile();
    
    if(!excelFilePath) return undefined
    
    await window.api.saveExcelFileNameInLocalDb(excelFilePath)
    return excelFilePath;
}

export const getExcelFileName = (excelFilePath) => {
    const messageDefault = "Par defaut un fichier excel nommé excel.xlxs sera créer dans le dossier (Cliquez pour changer)"
    if(!excelFilePath) return messageDefault ;
    return excelFilePath + "   (Cliquez pour changer)";
}
    