const DarkInput = ({props}: { props: any }) => {
    const inputStyle = {
        borderRadius: "1px",
        border: "1px solid transparent",
        padding: "0.5em 1.2em",
        fontSize: "1em",
        fontFamily: "inherit",
        color: "#0f0f0f",
        backgroundColor: "#ffffff",
        transition: "borderColor 0.25s",
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)"
    };
    
    return (
        <>
            <input style={inputStyle} value={props.text} disabled={true}/>
        </>
    )
}

export default DarkInput;