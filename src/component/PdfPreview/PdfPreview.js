import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import "./PdfPreview.css";

const PdfPreview = ({props}) => {
    
    
    function renderSwitch(FileHasBeenLoad){
        console.log(props.pdfData)
        switch (FileHasBeenLoad){
            case false:
                return preview;
            default:
                return "No pdf to load";
        }
    } 
    
    const preview = (
        <div className="pdfpreview-section">

            <Document  
                
                file={{data : props.pdfData}}>
                <Page height={0} pageNumber={1} />

            </Document>


        </div>
    )
    
    return(
        <div>
            {renderSwitch(props.isFile)}
        </div>
    )
}

export default PdfPreview;