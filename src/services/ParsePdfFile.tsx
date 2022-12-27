import {invoke} from "@tauri-apps/api/tauri";
import {open} from "@tauri-apps/api/dialog";

function parseAllSelectedFiles(pathFileToParse: string[]) {
    let filePath : string = pathFileToParse[0];
    
    invoke('parse_pdf_files', {fileName: filePath.toString() })
        .then(msg => console.log(msg))
        .catch((error) => console.error(error));
}

function parseFile(pathFileToParse: string) {
    invoke('parse_pdf_files', {fileName: pathFileToParse.toString() })
        .then(msg => console.log(msg))
        .catch((error) => console.error(error));
}

function manageSelection(pathFileToParse : string | string [] | null ) {
    if (Array.isArray(pathFileToParse)) {
        parseAllSelectedFiles(pathFileToParse)
    } else if (pathFileToParse === null) {
        console.log("2emeParstis")
    } else {
        parseFile(pathFileToParse)
    }
}


const ParsePdfFile = async () => {
    const pathFileToParse  = await open({
        multiple: true,
        filters: [{
            name: 'Pdf',
            extensions: ['pdf']
        }]
    })
        .then(fileToParse => {
            manageSelection(fileToParse);
        });
    

}

export default ParsePdfFile;