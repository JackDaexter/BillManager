import './LoadButton.css';



const LoadButton = ({props}: { props: any }) => {
    return (
        <>
            <button className="load_file" 
                    onClick={props.onClick}
                    disabled={false}> {props.buttonName}</button>
        </>
    )
}

export default LoadButton;