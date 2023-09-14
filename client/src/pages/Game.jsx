import React, {useEffect} from 'react';
import axios from "axios";
import NonPlayerCharacterCard from "../components/NonPlayerCharacterCard";
import PlayedCharacterCard from "../components/PlayedCharacterCard";

const Game = () => {
    // Récupération de l'id du personnage en paramètre d'URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const [winMessage, setWinMessage] = React.useState(undefined);
    const [attackMessage, setAttackMessage] = React.useState(["", ""]);

    const [character, setCharacter] = React.useState({
        player: undefined,
        opponent: {
            name: "Izuku Midoriya",
            picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn49YO-6bSlei9seIkgG_VewQ1VQvzGugP5w&usqp=CAU",
            strength: 1287,
            stamina: 23989,
            defense: 923,
            speed: 108
        }
    });

    const [currentHp, setCurrentHp] = React.useState({
        user: 0,
        opponent: character.opponent.stamina
    });

    const [techniquesUser, setTechniquesUser] = React.useState(undefined);

    const [techniquesCPU, setTechniquesCPU] = React.useState([
        {
            name: "Revêtement intégral",
            currentPP: 50,
            maxPP: 50,
            power: 50
        },
        {
            name: "Delaware smash",
            currentPP: 30,
            maxPP: 30,
            power: 80
        },
        {
            name: "Detroit smash",
            currentPP: 10,
            maxPP: 10,
            power: 100
        },
        {
            name: "Texas smash",
            currentPP: 5,
            maxPP: 5,
            power: 150
        },
    ]);

    useEffect(() => {
        // Récupération du token dans le localStorage
        const token = localStorage.getItem("token");
        // Si le token existe
        if (token) {
            // Récupération du personnage
            axios.get(`http://localhost:8000/characters/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setCharacter({...character, player: response.data.character})
                    setCurrentHp({...currentHp, user: response.data.character.stamina})
                    setTechniquesUser([
                        {
                            name: response.data.character.techniques[0].name,
                            power: response.data.character.techniques[0].power,
                            maxPP: response.data.character.techniques[0].pp,
                            currentPP: response.data.character.techniques[0].pp,
                        },
                        {
                            name: response.data.character.techniques[1].name,
                            power: response.data.character.techniques[1].power,
                            maxPP: response.data.character.techniques[1].pp,
                            currentPP: response.data.character.techniques[1].pp,
                        },
                        {
                            name: response.data.character.techniques[2].name,
                            power: response.data.character.techniques[2].power,
                            maxPP: response.data.character.techniques[2].pp,
                            currentPP: response.data.character.techniques[2].pp,
                        },
                        {
                            name: response.data.character.techniques[3].name,
                            power: response.data.character.techniques[3].power,
                            maxPP: response.data.character.techniques[3].pp,
                            currentPP: response.data.character.techniques[3].pp,
                        }
                    ])
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    const defineFirstAttacker = () => {
        if (character.player.speed > character.opponent.speed) {
            return "player";
        } else if (character.player.speed < character.opponent.speed) {
            return "opponent";
        } else if (Math.random() >= 0.5) {
            return "player";
        } else {
            return "opponent";
        }
    }

    const handleUserAttack = async (position, hp, index) => {
        return new Promise(resolve => {
            const newTechniques = [...techniquesUser];
            newTechniques[index].currentPP -= 1;
            setTechniquesUser(newTechniques);
            let damage;
            let critic = false

            // Choisir si l'attaque est un coup critique
            if (Math.random() >= 0.9) {
                damage = Math.floor(newTechniques[index].power * character.player.strength / character.opponent.defense * 20);
                critic = true
            } else {
                damage = Math.floor(newTechniques[index].power * character.player.strength / character.opponent.defense * 10);
            }

            // Calculer les dégâts
            const newHp = Math.max(0, hp - damage)
            setCurrentHp(current => {
                return {user: current.user, opponent: newHp}
            })

            // Afficher le message d'attaque a la position donnée
            setAttackMessage(current => {
                const newAttackMessage = [...current];
                newAttackMessage[position] = `${character.player.name} a utilisé ${techniquesUser[index].name} et a infligé ${damage} dégâts ! ${critic ? "C'est un coup critique !" : ""}`
                return newAttackMessage
            })


            // Verifier si les PV de l'adversaire sont inférieurs ou égaux à zero
            if (newHp <= 0) {

                // Si oui, fin de la partie
                setWinMessage("Vous avez gagné !");
                resolve(true)
            }
            resolve(false)
        })
    }

    const handleCpuAttack = async (position, hp) => {
        return new Promise(resolve => {

            // Choisi aléatoirement une attaque
            const index = Math.floor(Math.random() * techniquesCPU.length);

            // Définir les dégâts
            let damage;
            let critic = false

            // Choisir si l'attaque est un coup critique
            if (Math.random() >= 0.9) {
                damage = Math.floor(techniquesCPU[index].power * character.opponent.strength / character.player.defense * 20);
                critic = true
            } else {
                damage = Math.floor(techniquesCPU[index].power * character.opponent.strength / character.player.defense * 10);
            }

            // Réduire les PV du joueur
            const newHp = Math.max(0, hp - damage)
            setCurrentHp(current => {
                return {opponent: current.opponent, user: newHp}
            })

            // Afficher le message d'attaque a la position donnée
            setAttackMessage(current => {
                const newAttackMessage = [...current];
                newAttackMessage[position] = `${character.opponent.name} a utilisé ${techniquesCPU[index].name} et a infligé ${damage} dégâts ! ${critic ? "C'est un coup critique !" : ""}`
                return newAttackMessage
            })

            // Verifier si les PV du joueur sont inférieurs ou égaux à zero
            if (newHp <= 0) {

                // Si oui, fin de la partie
                setWinMessage("Vous avez perdu !")
                resolve(true)
            }
            resolve(false)
        })
    }

    const handleAttack = async (index) => {
        // Vérifier que la partie n'est pas terminée
        if (winMessage) {
            return
        }

        setAttackMessage(["", ""])

        // Vérifier que l'attaque est possible
        if (techniquesUser[index].currentPP > 0) {

            // Verifier qui attaque en premier
            const firstAttacker = defineFirstAttacker();
            if (firstAttacker === "player") {

                // Effectuer la premiere attaque
                const finished = await handleUserAttack(0, currentHp.opponent, index);

                // Verifier que la partie n'est pas terminée
                if (!finished) {
                    // Effectuer la seconde attaque
                    await handleCpuAttack(1, currentHp.user);
                }
            } else {

                // Effectuer la premiere attaque
                const finished = await handleCpuAttack(0, currentHp.user);

                // Verifier que la partie n'est pas terminée
                if (!finished) {
                    // Effectuer la seconde attaque
                    await handleUserAttack(1, currentHp.opponent, index);
                }
            }
        } else {
            console.log("Plus de PP")
        }
    }

    return (
        <>
            {winMessage && <h1 style={{textAlign: "center"}}>{winMessage}</h1>}
            <div style={{display: "flex", justifyContent: "space-around", alignContent: "center"}}>
                {character.player &&
                    <PlayedCharacterCard
                        character={character.player}
                        currentHp={currentHp.user}
                        techniques={techniquesUser}
                        handleAttack={handleAttack}
                    />
                }

                {character.opponent &&
                    <NonPlayerCharacterCard
                        character={character.opponent}
                        currentHp={currentHp.opponent}
                    />
                }
            </div>
            {attackMessage && (
                <>
                    <div style={{textAlign: "center"}}>{attackMessage[0]}</div>
                    <div style={{textAlign: "center"}}>{attackMessage[1]}</div>
                </>
            )}
        </>
    );
};

export default Game;
