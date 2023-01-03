

const Field = {
    DATE : 'null',
    JOURNAL: 'null',
    COMPTE  : 'null',
    PIECE: 'null',
    LIBELLE: 'null',
    debitetcrebit: 'null',
}


module.exports = {

    retrieveDataToPutInExcel : (pdfData) =>{
        const pdfTextWithSpace = pdfData.text

        const pdfText = pdfTextWithSpace.map(function (el) {
            return el.replace(/\s/g, '');
        });

        const date = pdfText.find( array => array.includes("Date"))
        const journal = "vt"
        const compte = "null"
        const piece = pdfText.find( array => array.includes("Facture"))
        const libelle = pdfText.find( array => array.includes("Client"))
        const debitetcrebit = pdfText.find( array => array.includes("Total Hors Taxes"))
        
        console.log(date.split('\t')[0])
        console.log(piece)
        console.log(libelle)
        console.log(debitetcrebit)
        
        Field.DATE = date;
        Field.JOURNAL = journal;
        Field.COMPTE = compte;
        Field.PIECE = piece;
        Field.LIBELLE = libelle;
        Field.debitetcrebit = debitetcrebit;
        return Field
    }
}