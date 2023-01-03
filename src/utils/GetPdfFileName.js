export const getPdfFileName = (filePath) => {
    
    if(!filePath) return  "Choisir une facture à traiter ...";
    
    if(filePath.includes(".pdf"))
        return filePath.split("\\").pop();
    return "Choisir une facture à traiter ...";
}