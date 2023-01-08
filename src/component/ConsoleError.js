import React from 'react';
import styled from 'styled-components'

const ConsoleError = ({dataToDisplay} : any) => {
    
    function getNonParasableData(){
        if(!dataToDisplay) return ""
        let data = Object.entries(dataToDisplay)
            .filter(([_, value]) => value === undefined)
            .map(([key, _]) => key)

        return data
    }
    
    function renderIfNonParsable(){
        const undefinedData = getNonParasableData()
        if(dataToDisplay){
            
            if(undefinedData)
                return (
                    <DisplayTextSection> 
                        <SavedData>Données ajoutés ✔! </SavedData> 
                        <MissingData>Excepté : {getNonParasableData().join(", ")} car non trouvé</MissingData>
                    </DisplayTextSection>
                )
            else{
                return (
                    <>
                        <SavedData> 
                            Toutes les données ont été ajoutés ✔ 
                        </SavedData>
                    </>
                )
            }
        }
        return <></>
    }
    
    return (
        <>
            {renderIfNonParsable()}
        </>
    );
}


const MissingData = styled.p`
    borderRadius: "1px";
    border: "1px solid transparent";
    padding: "0.5rem 2rem 0rem 0";
    fontSize: "1.125rem";
    fontFamily: "inherit";
    color: yellow;
    transition: "borderColor 0.25s";
    
`

const ValidData = styled.p`
    borderRadius: "1px";
    border: "1px solid transparent";
    padding: "0.5rem 2rem 0rem 0";
    fontSize: "1.125rem";
    fontFamily: "inherit";
    color: green;
    transition: "borderColor 0.25s";
    
`

const SavedData = styled.p`
    borderRadius: "1px";
    border: "1px solid transparent";
    padding: "0.5rem 2rem 0rem 0";
    fontSize: "1.125rem";
    fontFamily: "inherit";
    color: green;
    transition: "borderColor 0.25s";
    
`

const DisplayTextSection = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`

export default  ConsoleError