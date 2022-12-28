import {invoke} from "@tauri-apps/api/tauri";

const PdfPreview = ({props} : {props : any}) => {
    const preview = (
        <div>
            
        </div>
    )
    return(
        <div>
            {props.isFile == true ? preview : "No pdf to load"}
        </div>
    )
}

export default PdfPreview;