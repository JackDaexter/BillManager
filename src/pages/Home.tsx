import './Home.css'
import ParsePdfFile from "../services/ParsePdfFile";
import PdfPreview from "../component/PdfView";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



const Home = () => {

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
                        <PdfPreview />
                    </div>
                    <div className="loadfolder-input-section">
                        <input id="load_file_path"  />
                        <button className="load_file" disabled={true} >Charger un dossier</button>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="pdfpreview-section">
                        <PdfPreview />
                    </div>
                    <div className="choice-analysis-section">


                        <div className="loadfile-input-section">
                            <input id="load_file_path"  />
                            <button onClick={ParsePdfFile}>Charger un fichier</button>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
           
            
            <div className="save-section">
                <button className="save-file" onClick={ParsePdfFile}>Sauvegarder</button>
            </div>
        </div>
    )
}

export default Home;