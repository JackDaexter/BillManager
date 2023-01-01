

function parseFile(pathFileToParse) {

}

function returnFilePathIfExist(pathFileToParse ) {
    
    if (Array.isArray(pathFileToParse)) {
        console.log("On a trouvé tableau: " + pathFileToParse[0])
        return pathFileToParse[0];
    } else if (pathFileToParse === null) {
        return "file not found"
    } else {
        console.log("On a  keudalte : " + pathFileToParse)

        return pathFileToParse
    }
}


const openPdfFile = async () => {
  
}
const ParsePdfFile = () => {
   
    
    return "filePath";
        
}

export default ParsePdfFile;