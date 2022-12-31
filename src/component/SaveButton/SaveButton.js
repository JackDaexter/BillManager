import 'SaveButton.css'


const SaveButton = ({props}: { props: any }) => {
    return (
        <>
            <button className="load_file" disabled={false}> {props.buttonName}</button>
        </>
    )
}

export default SaveButton;