import './SaveButton.css'


const SaveButton = ({props}) => {
    return (
        <button className="save_button" disabled={false}> {props.buttonName}</button>
    )
}

export default SaveButton;