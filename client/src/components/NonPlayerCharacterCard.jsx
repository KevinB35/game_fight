import React from 'react';
import {Card} from "react-bootstrap";

const NonPlayerCharacterCard = ({character, currentHp}) => {
    return (
        <Card style={{width: '25rem'}} className={"m-2"}>
            <Card.Img variant="top" src={character.picture} height={300} style={{objectFit: "cover"}}/>
            <Card.Body>
                <Card.Title style={{display: "flex", justifyContent: "space-between"}}>
                    <span>
                        {character.name}
                    </span>
                    <span>
                        {currentHp} / {character.stamina}
                    </span>
                </Card.Title>
            </Card.Body>
        </Card>

    );
};

export default NonPlayerCharacterCard;
