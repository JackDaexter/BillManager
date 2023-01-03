import './Colorize.css';

const ColorizeText = ({props}) => {
    
    return (
        <>
            <p onClick={props.onClick}>
               {props.text}
            </p>
        </>
    )
}

export default ColorizeText;