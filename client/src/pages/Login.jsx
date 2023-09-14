import React, {useState} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [message, setMessage] = useState({
        status: "",
        message: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/users/login", user)
            .then(res => {
                // Si la requête est un succès, on stocke le token dans le localStorage
                localStorage.setItem("token", res.data.access)
                // Redirection vers la page d'accueil
                window.location.replace("/")
            })
            .catch(err => {
                console.log(err)
                setMessage({
                    status: "danger",
                    message: err.response.data.error
                })
            })
    }

    // Si l'utilisateur est déjà connecté, on le redirige vers la page d'accueil
    if (localStorage.getItem("token")) {
        window.location.replace("/")
    }

    return (
        <>
            <h1>Connexion</h1>
            {/* Si il y a un message, on l'affiche */}
            {message.message && <Alert variant={message.status}>{message.message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Adresse email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Adresse Email"
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
                    Connexion
                </Button>
            </Form>
        </>
    );
};

export default Login;
