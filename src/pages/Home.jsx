import './Home.css'
import {useEffect, useState} from "react";
import LoadButton from "../component/LoadButton/LoadButton";
import ColorizeText from "../component/ColorizeText/ColorizeText";
import {getPdfFileName} from "../utils/GetPdfFileName";
import {getExcelNameAndSaveInDb, getExcelFileName} from "../utils/GetExcelNameAndSaveInDb";
import ConsoleError from "../component/ConsoleError";
import ReactLoading from 'react-loading';


const fileData = {
    name : 'No file selected',
    text: [],
    pdfPath  : null,
    buffer: null
}

async function extractedPdfInfo(excelFilePath, dataFromPdf) {
    if (excelFilePath === "/" || excelFilePath === "\\")
        return await window.api.writeParsedDataInExcel(dataFromPdf.pdfPath, dataFromPdf);
    else
        return await window.api.writeParsedDataInExcel(excelFilePath, dataFromPdf);
}

function Home ()  {

    const [pdfInformation, setPdfInformation] = useState(fileData);
    const [excelFilePath, setExcelPath] = useState(__dirname);
    const [infoInExcel, setInfoInExcel] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);


    const setPdfInfo = (dataFromPdf) => {
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
            setPdfInfo(dataFromPdf);
            setIsLoading(true)
            var infoInExcel;
            infoInExcel = await extractedPdfInfo(excelFilePath, dataFromPdf);
            
            setInfoInExcel(infoInExcel);
            setIsLoading(false)

        }
    }

    const selectExcelFile = async () => {
        const excelFilePath = await getExcelNameAndSaveInDb();
        
        if(!excelFilePath) return;
        
        setExcelPath( _ => excelFilePath);
    } 
    
    
    const displayAppropiateLogo = () => {
        if(isLoading){
            return (
                <ReactLoading type={"spin"} color={"blue"} height={'20px'} width={'20px'} />
            );
        }
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
                    <div>{displayAppropiateLogo()}</div>
                </div>
                <div  className="unanalyzed-data-input-section">
                    <ConsoleError dataToDisplay={infoInExcel}/>
                </div>
                <div className="saveExcel-section">
                    <ColorizeText props={{isLoad: true, HoverText: "Choisir un fichier existant", text: getExcelFileName(excelFilePath), onClick: selectExcelFile}}/>
                </div>
            </div>
            
        </div>
    )
}


export default Home;