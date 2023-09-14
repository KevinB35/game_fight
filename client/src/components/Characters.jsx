import React from 'react';
import CharacterCard from "./CharacterCard";
import {Button} from "react-bootstrap";

const Characters = ({characters, handleDelete}) => {
    return (
        <>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}} className={"mt-2"}>
                {characters.length === 0 && <p>Aucun personnage</p>}
                {characters.map(character => (
                    <div key={character._id}>
                        <CharacterCard character={character} handleDelete={handleDelete}/>
                    </div>
                ))}
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "2rem"}}>
                <Button href={"/characters/create"}>Créer un personnage</Button>
            </div>
        </>
    );
};

export default Characters;