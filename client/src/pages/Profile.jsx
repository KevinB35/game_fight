import React, {useEffect} from 'react';
import axios from "axios";
import {Nav} from "react-bootstrap";
import Infos from "../components/Infos";
import Characters from "../components/Characters";

const Profile = ({tabProp}) => {
    // Récupération du tab en paramètre d'URL
    const urlParams = new URLSearchParams(window.location.search);
    let tab = urlParams.get('tab');

    // Si le tabProp est défini, on l'utilise
    if (tabProp) {
        tab = tabProp;
    }

    const [token, setToken] = React.useState(undefined);
    const [user, setUser] = React.useState(undefined);
    const [characters, setCharacters] = React.useState(undefined)

    useEffect(() => {
            // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
            if (!localStorage.getItem("token")) {
                window.location.replace("/login")
            }

            // Récupération du token dans le localStorage
            setToken(localStorage.getItem("token"));
            // Si le token existe
            if (token) {
                axios.get("http://localhost:8000/users/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        setUser(response.data.user);
                    })
                    .catch(error => {
                        console.log(error);
                    })

                axios.get("http://localhost:8000/characters/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        setCharacters(response.data.characters)
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
        , [token])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/characters/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                // Supprime le personnage de la liste
                setCharacters(characters.filter(character => character._id !== id))
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link
                        href={"/profile?tab=infos"}
                        className={(tab === "infos" || tab === null) ? "active" : ""}
                    >
                        Informations
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        href={"/profile?tab=characters"}
                        className={tab === "characters" ? "active" : ""}
                    >
                        Characters
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {token && user && (tab === "infos" || tab === null) && <Infos token={token} user={user}/>}
            {token && characters !== undefined && tab === "characters" &&
                <Characters characters={characters} handleDelete={handleDelete}/>}
        </div>
    );
};

export default Profile;