import './Home.css'
import {useEffect, useState} from "react";
import LoadButton from "../component/LoadButton/LoadButton";
import ColorizeText from "../component/ColorizeText/ColorizeText";
import {getPdfFileName} from "../utils/GetPdfFileName";
import {getExcelNameAndSaveInDb, getExcelFileName} from "../utils/GetExcelNameAndSaveInDb";


const fileData = {
    name : 'No file selected',
    text: [],
    pdfPath  : null,
    buffer: null
}

function Home ()  {

    const [pdfInformation, setPdfInformation] = useState(fileData);
    const [excelFilePath, setExcelPath] = useState(__dirname);


    const setInfo = (dataFromPdf) => {
        setPdfInformation( _ => {
            return {  
                name : dataFromPdf.name,
                text : dataFromPdf.text,
                pdfPath : dataFromPdf.pdfPath,
                buffer : dataFromPdf.buffer
            }
        });
    }

    const parsePdfFileAndWriteInExcel = async () => {
        const dataFromPdf = await window.api.parsePdfContent();
        
        if(!dataFromPdf) return;
        
        if(dataFromPdf.name.includes("pdf")){
            setInfo(dataFromPdf);
            await window.api.writeParsedDataInExcel(excelFilePath,dataFromPdf);
        }
    }

    const selectExcelFile = async () => {
        console.log("getExcelNameAndSaveInDb")

        const excelFilePath = await getExcelNameAndSaveInDb();
        if(!excelFilePath) return;

        console.log("setExcelPath")

        setExcelPath( _ => excelFilePath);
    } 
    
    useEffect( () => {
        const fetch = async () => {
            const excelFilePath = await window.api.checkIfExcelFileHasBeenSelectedPreviously();
            if (excelFilePath)
                setExcelPath(_ => excelFilePath);
        }
        fetch().catch(console.error);
    },[])
    
    return (
        <div className="home-content" >
            
            <div className="title-section">
                <h1>Welcome to Bill Manager! 📝</h1>
            </div>
            
            <div className="choice-analysis-section">
                <div className="loadfile-input-section">
                    <LoadButton props={{buttonName: getPdfFileName(pdfInformation.name), onClick : parsePdfFileAndWriteInExcel }}/>
                </div>
                <div className="saveExcel-section">
                    <ColorizeText props={{isLoad: true, HoverText: "Choisir un fichier existant", text: getExcelFileName(excelFilePath), onClick: selectExcelFile}}/>
                </div>
            </div>
           
        </div>
    )
}

export default Home;