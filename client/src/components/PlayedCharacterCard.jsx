import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";

const PlayedCharacterCard = ({character, currentHp, techniques, handleAttack}) => {
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
                <Container>
                    <Row>
                        <Col style={{
                            border: "1px solid lightgrey",
                            borderRadius: "1rem",
                            padding: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0.5rem",
                            textAlign: "center",
                            cursor: techniques[0].currentPP > 0 ? "pointer" : "not-allowed"
                        }}
                             onClick={() => handleAttack(0)}>
                            <div>{character.techniques[0].name}</div>
                            <div>PP: {techniques[0].currentPP} / {techniques[0].maxPP}</div>
                        </Col>

                        <Col style={{
                            border: "1px solid lightgrey",
                            borderRadius: "1rem",
                            padding: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0.5rem",
                            textAlign: "center",
                            cursor: techniques[1].currentPP > 0 ? "pointer" : "not-allowed"
                        }}
                             onClick={() => handleAttack(1)}>
                            <div>{character.techniques[1].name}</div>
                            <div>PP: {techniques[1].currentPP} / {techniques[1].maxPP}</div>
                        </Col>
                    </Row>
                    <Row>

                        <Col style={{
                            border: "1px solid lightgrey",
                            borderRadius: "1rem",
                            padding: "1rem",
                            margin: "0.5rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            cursor: techniques[2].currentPP > 0 ? "pointer" : "not-allowed"
                        }}
                             onClick={() => handleAttack(2)}>
                            <div>{character.techniques[2].name}</div>
                            <div>PP: {techniques[2].currentPP} / {techniques[2].maxPP}</div>
                        </Col>

                        <Col style={{
                            border: "1px solid lightgrey",
                            borderRadius: "1rem",
                            padding: "1rem",
                            margin: "0.5rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            cursor: techniques[3].currentPP > 0 ? "pointer" : "not-allowed"
                        }}
                             onClick={() => handleAttack(3)}>
                            <div>{character.techniques[3].name}</div>
                            <div>PP: {techniques[3].currentPP} / {techniques[3].maxPP}</div>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>

    );
};

export default PlayedCharacterCard;
