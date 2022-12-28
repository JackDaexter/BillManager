import './Home.css'
import PdfPreview from "../component/PdfPreview";
import {useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import LoadButton from "../component/LoadButton/LoadButton";
import DarkInput from "../component/DarkInput";
import ParsePdfFile from "../services/ParsePdfFile";


const Home = (props  : any) => {

    const [filePath, setFilePath] = useState("");
    
    const fileIsLoad = () => {
        console.log("sdfsdfsd")
        return filePath !== "file not found"
    }
    
    const parsePdfFile = async () => {
        var filePath = await ParsePdfFile()
        setFilePath( _ => filePath);
    }
    
    return (
        <div className="container" >
            
            <div className="title-section">
                <h1>Welcome to Bill Manager! 📝</h1>
            </div>

            <Tabs >
                <TabList>
                    <Tab>Gestion fichier</Tab>
                    <Tab>Gestion dossier</Tab>
                </TabList>
                <TabPanel>
                    <div className="pdfpreview-section">
                        <PdfPreview props={{isFile:fileIsLoad()}}/>
                    </div>
                    <div className="choice-analysis-section">
                        <div className="loadfile-input-section">
                            <DarkInput props={{text : filePath}} />
                            <LoadButton props={{buttonName: "Charger fichier", onClick : parsePdfFile }}/>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
            
            <div className="save-section">
                <LoadButton props={{buttonName:"Sauvegarder le fichier" }} />
            </div>
        </div>
    )
}

export default Home;