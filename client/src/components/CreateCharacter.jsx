import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Alert, Button, Form} from "react-bootstrap";

const CreateCharacter = () => {
    const [token, setToken] = React.useState(undefined);
    const [character, setCharacter] = useState({
        name: "",
        picture: "",
        strength: 0,
        defense: 0,
        stamina: 0,
        speed: 0,
        techniques: [
            {
                name: "",
                power: 0,
                pp: 0
            }, {
                name: "",
                power: 0,
                pp: 0
            }, {
                name: "",
                power: 0,
                pp: 0
            }, {
                name: "",
                power: 0,
                pp: 0
            }
        ]
    })
    const [message, setMessage] = useState({
        type: "",
        text: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/characters", character, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                // Redirige l'utilisateur vers la page de profil
                window.location.replace("/profile?tab=characters")
            })
            .catch(error => {
                setMessage({
                    type: "danger",
                    text: error.response.data.error
                })
            })
    }

    useEffect(() => {
        // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
        if (!localStorage.getItem("token")) {
            window.location.replace("/login")
        }

        // Récupération du token dans le localStorage
        setToken(localStorage.getItem("token"))
    }, []);


    return (
        <div>
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nom"
                        value={character.name}
                        onChange={(e) => setCharacter({...character, name: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="picture">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Image"
                        value={character.picture}
                        onChange={(e) => setCharacter({...character, picture: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="strength">
                    <Form.Label>Force</Form.Label>
                    <Form.Control
                        type="number"
                        value={character.strength}
                        onChange={(e) => setCharacter({...character, strength: parseInt(e.target.value)})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="stamina">
                    <Form.Label>Endurance</Form.Label>
                    <Form.Control
                        type="number"
                        value={character.stamina}
                        onChange={(e) => setCharacter({...character, stamina: parseInt(e.target.value)})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="defense">
                    <Form.Label>Defense</Form.Label>
                    <Form.Control
                        type="number"
                        value={character.defense}
                        onChange={(e) => setCharacter({...character, defense: parseInt(e.target.value)})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="speed">
                    <Form.Label>Vitesse</Form.Label>
                    <Form.Control
                        type="number"
                        value={character.speed}
                        onChange={(e) => setCharacter({...character, speed: parseInt(e.target.value)})}
                    />
                </Form.Group>

                <div style={{display: "flex"}}>
                    <Form.Group className="mb-3" controlId="technique1Name" style={{width: "33.3%"}}>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={"Nom"}
                            value={character.techniques[0].name}
                            onChange={(e) => setCharacter({
                                ...character,
                                techniques: [{
                                    ...character.techniques[0],
                                    name: e.target.value
                                }, character.techniques[1], character.techniques[2], character.techniques[3]]
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="technique1Power" style={{width: "33.3%"}}>
                        <Form.Label>Puissance</Form.Label>
                        <Form.Control
                            type="number"
                            value={character.techniques[0].power}
                            onChange={(e) => setCharacter({
                                ...character,
                                techniques: [{
                                    ...character.techniques[0],
                                    power: e.target.value
                                }, character.techniques[1], character.techniques[2], character.techniques[3]]
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="technique1PP" style={{width: "33.3%"}}>
                        <Form.Label>PP</Form.Label>
                        <Form.Control
                            type="text"
                            value={character.techniques[0].pp}
                            onChange={(e) => setCharacter({
                                ...character,
                                techniques: [{
                                    ...character.techniques[0],
                                    pp: e.target.value
                                }, character.techniques[1], character.techniques[2], character.techniques[3]]
                            })}
                        />
                    </Form.Group>
                </div>


                <div style={{display: "flex"}}>
                    <Form.Group className="mb-3" controlId="technique2Name" style={{width: "33.3%"}}>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={"Nom"}
                            value={character.techniques[1].name}
                            onChange={(e) => setCharacter({
                                ...character,
                                techniques: [character.techniques[0],
                                    {
                                        ...character.techniques[1],
                                        name: e.target.value
                                    }, character.techniques[2], character.techniques[3]]
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="technique2Power" style={{width: "33.3%"}}>
                        <Form.Label>Puissance</Form.Label>
                        <Form.Control
                            type="number"
                            value={character.techniques[1].power}
                            onChange={(e) => setCharacter({
                                ...character,
                                techniques: [
                                    character.techniques[0], {
                                        ...character.techniques[1],
                                        power: e.target.value
                                    }, character.techniques[2], character.techniques[3]]
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="technique2PP" style={{width: "33.3%"}}>
                        <Form.Label>PP</Form.Label>
                        <Form.Control
                            type="text"
                            value={character.techniques[1].pp}
                            onChange={(e) => setCharacter({
                                ...character,
                                techniques: [
                                    character.techniques[0], {
                                        ...character.techniques[1],
                                        pp: e.target.value
                                    }, character.techniques[2], character.techniques[3]]
                            })}
                        />
                    </Form.Group>
                </div>


                <div style={{display: "flex"}}>
                    <Form.Group className="mb-3" controlId="technique3Name" style={{width: "33.3%"}}>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={"Nom"}
                            value={character.techniques[2].name}
                            onChange={(e) => setCharacter({
                                ...character,
                                techniques: [character.techniques[0], character.techniques[1], {
                                    ...character.techniques[2],
                                    name: e.target.value
                                }, character.techniques[3]]
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="technique3Power" style={{width: "33.3%"}}>
                        <Form.Label>Puissance</Form.Label>
                        <Form.Control
                            type="number"
                            value={character.techniques[2].power}
                            onChange={(e) => setCharacter({
                                ...character,
                                techniques: [character.techniques[0], character.techniques[1], {
                                    ...character.techniques[2],
                                    power: e.target.value
                                }, character.techniques[3]]
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="technique3PP" style={{width: "33.3%"}}>
                        <Form.Label>PP</Form.Label>
                        <Form.Control
                            type="text"
                            value={character.techniques[2].pp}
                            onChange={(e) => setCharacter({
                                ...character,
                                techniques: [character.techniques[0], character.techniques[1], {
                                    ...character.techniques[2],
                                    pp: e.target.value
                                }, character.techniques[3]]
                            })}
                        />
                    </Form.Group>
                </div>


                <div style={{display: "flex"}}>
                    <Form.Group className="mb-3" controlId="technique4Name" style={{width: "33.3%"}}>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={"Nom"}
                            value={character.techniques[3].name}
                            onChange={(e) => setCharacter({
                                ...character,
                                techniques: [character.techniques[0], character.techniques[1], character.techniques[2], {
                                    ...character.techniques[3],
                                    name: e.target.value
                                },]
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="technique4Power" style={{width: "33.3%"}}>
                        <Form.Label>Puissance</Form.Label>
                        <Form.Control
                            type="number"
                            value={character.techniques[3].power}
                            onChange={(e) => setCharacter({
                                ...character,
                                techniques: [character.techniques[0], character.techniques[1], character.techniques[2], {
                                    ...character.techniques[3],
                                    power: e.target.value
                                },]
                            })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="technique4PP" style={{width: "33.3%"}}>
                        <Form.Label>PP</Form.Label>
                        <Form.Control
                            type="text"
                            value={character.techniques[3].pp}
                            onChange={(e) => setCharacter({
                                ...character,
                                techniques: [character.techniques[0], character.techniques[1], character.techniques[2], {
                                    ...character.techniques[3],
                                    pp: e.target.value
                                },]
                            })}
                        />
                    </Form.Group>
                </div>

                <Button variant="primary" type="submit">
                    Ajouter
                </Button>
            </Form>

        </div>
    );
};

export default CreateCharacter;