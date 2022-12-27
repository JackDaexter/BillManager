import './Home.css'
import { confirm,open  } from '@tauri-apps/api/dialog';
import { appDir } from '@tauri-apps/api/path';
import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';

function parseFile() {
    
}

function manageSelectedFile(choosedFileToParse : any) {
    console.log(choosedFileToParse[0]);
    
}

function manageSelection({choosedFileToParse}: { choosedFileToParse: any }) {
    if (Array.isArray(choosedFileToParse)) {
        manageSelectedFile(choosedFileToParse)
    } else if (choosedFileToParse === null) {
        console.log("2emePartis")
    } else {
        console.log("3emepart")

        manageSelectedFile(choosedFileToParse)
    }
}

const selectFileToParse = async () => {
    const choosedFileToParse = await open({
        multiple: true,
        filters: [{
            name: 'Pdf',
            extensions: ['pdf']
        }]
    });
    manageSelection({choosedFileToParse: choosedFileToParse});

}

const selectFolderToParse = async () => {
    const chooseFolderToParse = await open({
        directory: true,
        multiple: true,
        defaultPath: await appDir(),
    });
    
}
const Home = () => {

    return(
        <div>
            <h1>Welcome to Bill Manager! 📝</h1>
            <div className="preview_section">
            

            </div>
            <div className="choice_analysis">
                <button>Analyser un dossier</button>
                <button onClick={selectFileToParse}>Analyser un fichier</button>
            </div>
        </div>
    )
}

export default Home;