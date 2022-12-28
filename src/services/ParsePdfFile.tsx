import {invoke} from "@tauri-apps/api/tauri";
import {open} from "@tauri-apps/api/dialog";


function parseFile(pathFileToParse: string) {
    invoke('parse_pdf_files', {fileName: pathFileToParse.toString() })
        .then(msg => console.log(msg))
        .catch((error) => console.error(error));
}

function returnFilePathIfExist(pathFileToParse : string | string [] | null ) : string {
    
    if (Array.isArray(pathFileToParse)) {
        return pathFileToParse[0];
    } else if (pathFileToParse === null) {
        return "file not found"
    } else {
        return pathFileToParse
    }
}

const openPdfFile = async () => {
    return await open({
        title:"Select the bill to analyze",
        multiple: false,
        filters: [{
            name: 'Pdf',
            extensions: ['pdf']
        }]
    });
}
const ParsePdfFile = async () : Promise<string> => {

    const result = await openPdfFile();
    const filePath : string = returnFilePathIfExist(result);
    
    parseFile(filePath);
    
    return filePath;
        
}

export default ParsePdfFile;