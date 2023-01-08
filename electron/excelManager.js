const Field = {
    DATE : undefined,
    JOURNAL: undefined,
    COMPTE  : undefined,
    PIECE: undefined,
    LIBELLE: undefined,
    debitetcrebit: undefined,
}

function priceCleaned(stringPrice){
    if(!stringPrice) return undefined
    return stringPrice.replace('€','');
}

function cleanedText(text){
    if(!text) return undefined
    let textWithoutSpace = text.replace(/\s/g, '');
    return textWithoutSpace.replace(':', '')
}

function extractFactureIfMixedWithData(dateData){
    if(dateData.toLowerCase().includes("date")){
        const facture = dateData.split('Date')[0]
        return cleanedText(facture)
    }
    return undefined
}

function extractDateData(dateData) {
    if(dateData.toLowerCase().includes("date")){
        const date = dateData.split('Date')[1]
        return cleanedText(date)
    }
    return undefined
}

function extractFactureData(dateData) {
    if(dateData.toLowerCase().includes("facture")){
        const facture = extractFactureIfMixedWithData(dateData)
        if(facture){
            return facture.split('Facture')[1]
        }
        const price =  dateData.split('Facture')[1]
        return cleanedText(price)
    }
    return undefined
}

function extractClientName(clientNameData) {
    if (clientNameData.toLowerCase().includes("client")) {
        return clientNameData.split(':')[1]
    }
    return undefined
}

function extractCreditEtDebit(dateData) {
    return undefined;
}

function extractDebitEtCredit(debitetcrebit) {
    if(debitetcrebit.toLowerCase().includes("taxe")){
        const credit = extractCreditEtDebit(debitetcrebit)
        if(credit){
            return credit.split(':')[1]
        }
        let creditetdebit = debitetcrebit.split(':')[1]
        creditetdebit = cleanedText(creditetdebit)
        return priceCleaned(creditetdebit)
    }
    return undefined;
}

module.exports = {

    retrieveDataToPutInExcel : (pdfData) =>{
        const pdfText = pdfData.text

        if(!pdfText) return undefined
        
        const date = pdfText.find( array => array.includes("Date"))
        const journal = "vt"
        const compte = undefined
        const piece = pdfText.find( array => array.includes("Facture"))
        const libelle = pdfText.find( array => array.includes("Client"))
        const debitetcrebit = pdfText.find( array => array.includes("Total Hors Taxes"))

        Field.DATE = extractDateData(date);
        Field.JOURNAL = journal;
        Field.COMPTE = compte;
        Field.PIECE = extractFactureData(piece);
        Field.LIBELLE = extractClientName(libelle);
        Field.debitetcrebit = extractDebitEtCredit(debitetcrebit);

        
        return Field
    }
}

/*     
*/