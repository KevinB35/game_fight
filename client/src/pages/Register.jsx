import React, {useState} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import axios from "axios";

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [message, setMessage] = useState({
        type: "",
        text: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/users", user)
            .then(() => {
                setMessage({
                    type: "success",
                    text: "Votre compte a bien été créé ! Vous allez être redirigé vers la page de connexion dans quelques instants."
                })
                // Redirection vers la page de connexion après 3 secondes
                setTimeout(() => {
                    window.location.replace("/login")
                }, 3000)
            })
            .catch(error => {
                setMessage({
                    type: "danger",
                    text: error.response.data.error
                })
            })
    }

    return (
        <div>
            <h1>Inscription</h1>
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Nom d'utilisateur</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Adresse Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Mot de Passe</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Mot de passe"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    S'inscrire
                </Button>
            </Form>

        </div>
    );
};

export default Register;
