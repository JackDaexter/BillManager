
const DarkText = (props) => {
    const inputStyle = {
        borderRadius: "1px",
        border: "1px solid transparent",
        padding: "0.5rem 2rem 0rem 0",
        fontSize: "1.225rem",
        fontFamily: "inherit",
        color: "#ff5d00",
        transition: "borderColor 0.25s",
    };
    
    return (
        <>
            <p style={inputStyle}>
                {props.children}
            </p>
        </>
    )
}

export default DarkText;