import './Home.css'
import {open} from '@tauri-apps/api/dialog';
import {appDir} from '@tauri-apps/api/path';
import {invoke} from '@tauri-apps/api/tauri'
import ParsePdfFile from "../services/ParsePdfFile";
import PdfPreview from "../component/PdfView";


const Home = () => {

    return (
        <div className="container">
            <h1>Welcome to Bill Manager! 📝</h1>
            <div className="pdfpreview-section">
                <PdfPreview />
            </div>
            <div className="choice-analysis">
                <button className="load_file" disabled={true} >Analyser un dossier</button>
                <button onClick={ParsePdfFile}>Analyser un fichier</button>
            </div>
        </div>
    )
}

export default Home;