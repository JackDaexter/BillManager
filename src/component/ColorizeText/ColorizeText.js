import styled from 'styled-components'

const ColorizeText = ({props}) => {
    
    return (
        <>
            <ColorText>
                <p onClick={props.onClick}>
                   {props.text}
                </p>
            </ColorText>

        </>
    )
}

const ColorText = styled.p`
    cursor: pointer ;
    borderRadius: "1px";
    border: "1px solid transparent";
    padding: "0.5rem 2rem 0rem 0";
    fontSize: "1.125rem";
    fontFamily: "inherit";
    color: green;
    content: "Changer le theme";
    transition: "borderColor 0.25s";
    
    &:hover{
        background-color: yellow;
    }
`

export default ColorizeText;