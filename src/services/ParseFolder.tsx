import {open} from "@tauri-apps/api/dialog";

function manageSelection({choosedFileToParse}: { choosedFileToParse: any }) {
    if (Array.isArray(choosedFileToParse)) {
        //TODO
    } else if (choosedFileToParse === null) {
        //TODO    
    } else {
        //TODO    
    }
}

const ParseFolder = async () => {
    const choosedFileToParse = await open({
        multiple: true,
        filters: [{
            name: 'Pdf',
            extensions: ['pdf', 'txt', 'json']
        }]
    });
    manageSelection({choosedFileToParse: choosedFileToParse});

}

export default ParseFolder();