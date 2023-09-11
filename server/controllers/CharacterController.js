const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.addCharacter = async (req, res) => {
    try {
        // Vérifier que le token est présent
        if (!req.headers.authorization) return res.status(403).json({error: "Accès refusé"})

        // Récupère le token depuis l'Authorization
        const token = req.headers.authorization.split(" ")[1]

        const {userId} = jwt.decode(token)

        const user = await User.findById(userId)
        if (!user) return res.status(404).json({error: "Utilisateur non trouvé"})

        // Ajout du personnage à l'utilisateur
        user.characters.push({
            name: req.body.name,
            picture: req.body.picture,
            strength: req.body.strength,
            stamina: req.body.stamina,
            defense: req.body.defense,
            speed: req.body.speed,
            techniques: req.body.techniques
        })
        await user.save()

        res.json({user})
    } catch (err) {
        console.error(err)
        res.status(500).json({error: err})
    }
}

exports.listCharacters = async (req, res) => {
    // Vérifier que le token est présent
    if (!req.headers.authorization) return res.status(403).json({error: "Accès refusé"})

    // Récupère le token depuis l'Authorization
    const token = req.headers.authorization.split(" ")[1]

    const {userId} = jwt.decode(token)

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({error: "Utilisateur non trouvé"})

    res.json({characters: user.characters})
}

exports.getCharacter = async (req, res) => {
    // Vérifier que le token est présent
    if (!req.headers.authorization) return res.status(403).json({error: "Accès refusé"})
    // Récupère le token depuis l'Authorization
    const token = req.headers.authorization.split(" ")[1]
    const {userId} = jwt.decode(token)
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({error: "Utilisateur non trouvé"})

    // Filtre le tableau de personnages pour ne garder que celui qui a l'id demandé
    const character = user.characters.filter(character => character._id.toString() === req.params.id)[0]

    if (!character) return res.status(404).json({error: "Personnage non trouvé"})
    res.json({character})
}

exports.deleteCharacter = async (req, res) => {
    // Vérifier que le token est présent
    if (!req.headers.authorization) return res.status(403).json({error: "Accès refusé"})
    // Récupère le token depuis l'Authorization
    const token = req.headers.authorization.split(" ")[1]
    const {userId} = jwt.decode(token)
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({error: "Utilisateur non trouvé"})

    // Vérifie que le personnage existe
    const characterToDelete = user.characters.filter(character => character._id.toString() === req.params.id)[0]
    if (!characterToDelete) return res.status(404).json({error: "Personnage non trouvé"})

    // Filtre le tableau de personnages pour supprimer celui demandé
    user.characters = user.characters.filter(character => character !== characterToDelete)

    await user.save()
    res.json({user})
}