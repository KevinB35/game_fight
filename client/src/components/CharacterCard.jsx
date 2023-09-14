import React from 'react';
import {Button, Card} from "react-bootstrap";

const CharacterCard = ({character, handleDelete}) => {
    return (
        <Card style={{width: '18rem'}} className={"m-2"}>
            <Card.Img variant="top" src={character.picture} height={300} style={{objectFit: "cover"}}/>
            <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>
                    <p>Force: {character.strength}</p>
                    <p>Endurance: {character.stamina}</p>
                    <p>Defense: {character.defense}</p>
                    <p>Vitesse: {character.speed}</p>
                </Card.Text>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <Button variant={"danger"} onClick={() => handleDelete(character._id)}>Supprimer</Button>
                    <Button href={`/game?id=${character._id}`}>Jouer</Button>
                </div>
            </Card.Body>
        </Card>

    );
};

export default CharacterCard;
