import './Home.css'
import {useState} from "react";
import LoadButton from "../component/LoadButton/LoadButton";
import DarkText from "../component/DarkText";

function Home ()  {

    const [filePath, setFilePath] = useState("");
    const [pdfContent, setpdfContent] = useState(null);
    
    const fileIsLoad = () => {
        console.log("WELL : " + filePath.includes("pdf"))
        return filePath.includes("pdf")
    }
    
    const parsePdfFile = async () => {
        const result = await window.api.parsePdfContent();
        if(result.name.includes("pdf")){
            setFilePath( _ => result.name);
            setpdfContent(_ => result.buffer);
            console.log(fileIsLoad());
        }
    }
    
    const getFileName = (filePath) => {
        if(filePath.includes(".pdf"))
            return filePath.split("\\").pop();
        return "Choisissez une facture à traiter ...";
    } 
    
    return (
        <div className="home-content" >
            
            <div className="title-section">
                <h1>Welcome to Bill Manager! 📝</h1>
            </div>
            
            <div className="choice-analysis-section">
                <div className="loadfile-input-section">
                    <DarkText>{getFileName(filePath)} </DarkText>
                    <LoadButton props={{buttonName: "Choisir un une facture", onClick : parsePdfFile }}/>
                </div>
            </div>
           
        </div>
    )
}

export default Home;