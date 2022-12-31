import './Home.css'
import PdfPreview from "../component/PdfPreview";
import {useState} from "react";
import LoadButton from "../component/LoadButton/LoadButton";
import DarkText from "../component/DarkText";

function Home ()  {

    const [filePath, setFilePath] = useState("");
    
    const fileIsLoad = () => {
        return filePath !== "file not found"
    }
    
    const parsePdfFile = async () => {
        const textFromPdf = await api.parsePdfContent();
        console.log(result);
    }
    
    return (
        <div className="container" >
            
            <div className="title-section">
                <h1>Welcome to Bill Manager! 📝</h1>
            </div>
            
            <div className="pdfpreview-section">
                <PdfPreview props={{isFile:fileIsLoad()}}/>
            </div>
            <div className="choice-analysis-section">
                <div className="loadfile-input-section">
                    <DarkText>{filePath} </DarkText>
                    <LoadButton props={{buttonName: "Charger fichier", onClick : parsePdfFile }}/>
                </div>
            </div>
            
            <div className="save-section">
                <LoadButton props={{buttonName:"Sauvegarder le fichier" }} />
            </div>
        </div>
    )
}

export default Home;