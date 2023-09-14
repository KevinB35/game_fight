import React from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import axios from "axios";

const Infos = ({user, token}) => {
    const [newUser, setNewUser] = React.useState(user);
    const [message, setMessage] = React.useState({
        type: "",
        text: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        // On vide les valeurs étant égales aux précédentes
        const username = user.username === newUser.username ? "" : newUser.username
        const email = user.email === newUser.email ? "" : newUser.email
        console.log(username)
        axios.put(`http://localhost:8000/users`, {
            username, email
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setMessage({
                    type: "success",
                    text: "Votre profil a bien été mis à jour ! Vous allez maintenant être déconnecté."
                })
                // Déconnecte l'utilisateur dans 3 secondes pour mettre à jour le token
                setTimeout(() => {
                    localStorage.removeItem("token");
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
        <div className={"mt-2"}>
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}
            {user ? (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control
                            type="text"
                            value={newUser.username}
                            onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Adresse Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Mettre à jour
                    </Button>
                </Form>
            ) : (<h2>Chargement du profil...</h2>)}
        </div>
    );
};

export default Infos;
