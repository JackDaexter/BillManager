export const getExcelNameAndSaveInDb = async () => {
    const excelFilePath = await window.api.selectExcelFile();
    
    if(!excelFilePath) return undefined
    
    await window.api.saveExcelFileNameInLocalDb(excelFilePath)
    return excelFilePath;
}

export const getExcelFileName = (excelFilePath) => {
    const messageDefault = "Par defaut le excel sera nommé Facture.xlxs et créé dans le même dossier que celui du pdf fourni (Cliquez pour changer)"
    if(excelFilePath === "/" || excelFilePath === "\\") return messageDefault ;
    console.log("On est bien là " + excelFilePath);
    return excelFilePath + "   (Cliquez ici pour changer la destination d'enregistrement)";
}
    