
const PdfPreview = (props) => {
    const preview = (
        <div>
            
        </div>
    )
    return(
        <div>
            {props.isFile === true ? preview : "No pdf to load"}
        </div>
    )
}

export default PdfPreview;