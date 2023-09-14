import React, {useEffect} from 'react';
import {Container, Navbar} from "react-bootstrap";
import jwtDecode from "jwt-decode";

const NavBar = () => {
    const [user, setUser] = React.useState(undefined);

    useEffect(() => {
        // Récupération du token dans le localStorage
        const token = localStorage.getItem("token");
        // Si le token existe
        if (token) {
            // On récupère le payload du token
            setUser(jwtDecode(token));
        }
    }, []);

    const handleDisconnect = (e) => {
        e.preventDefault()
        // Suppression du token dans le localStorage
        localStorage.removeItem("token");
        // Redirection vers la page d'accueil
        window.location = "/";
    }

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Accueil</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    {user ? (
                        <>
                            <Navbar.Text style={{marginRight: "1rem"}}>
                                <a href="/profile">{user.username}</a>
                            </Navbar.Text>
                            <Navbar.Text>
                                <a href="/logout" onClick={handleDisconnect}>Déconnexion</a>
                            </Navbar.Text>
                        </>
                    ) : (
                        <>
                            <Navbar.Text style={{marginRight: "1rem"}}>
                                <a href="/login">Connexion</a>
                            </Navbar.Text>
                            <Navbar.Text>
                                <a href="/register">Inscription</a>
                            </Navbar.Text>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};

export default NavBar;