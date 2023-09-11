const dotenv = require('dotenv');
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

dotenv.config()

exports.getUser = async (req, res) => {
    try {
        // Vérifier que le token est présent
        if (!req.headers.authorization) return res.status(403).json({error: "Accès refusé"})

        // Récupère le token depuis l'Authorization
        const token = req.headers.authorization.split(" ")[1]

        const {userId} = jwt.decode(token)

        const user = await User.findById(userId)
        if (!user) return res.status(404).json({error: "Utilisateur non trouvé"})
        res.json({user: user})
    } catch (err) {
        console.error(err)
        res.status(500).json({error: err})
    }
}

exports.postRegister = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: "user"
        })
        const user = await User.findOne({email: req.body.email})
        res.json({user: user})
    } catch (err) {
        console.error(err)
        if (err.code === 11000) {
            res.status(500).json({error: "Le nom d'utilisateur ou l'email est déjà utilisé"})
            return
        }
        res.status(500).json({error: "Impossible d'ajouter l'utilisateur"})
    }
}

exports.postLogin = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})

        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign(
                {
                    userId: user._id,
                    username: user.username,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {expiresIn: "2h"}
            )
            res.json({access: token})
        } else {
            res.json({error: "L'utilisateur n'existe pas"})
        }
    } catch (err) {
        console.error(err)
        res.json({error: err})
    }
}

exports.updateProfile = async (req, res) => {
    try {
        // Vérifier que le token est présent
        if (!req.headers.authorization) return res.status(403).json({error: "Accès refusé"})

        // Récupère le token depuis l'Authorization
        const token = req.headers.authorization.split(" ")[1]
        const {userId} = jwt.decode(token)

        const {username, email} = req.body
        await User.findByIdAndUpdate(userId, {username, email})
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({error: "Utilisateur non trouvé"})
        // Si tout s'est bien passé, on renvoie l'utilisateur
        res.json({user: user})
    } catch (err) {
        console.error(err)
        res.status(500).json({error: err})
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        // Vérifier que le token est présent
        if (!req.headers.authorization) return res.status(403).json({error: "Accès refusé"})

        // Récupère le token depuis l'Authorization
        const token = req.headers.authorization.split(" ")[1]
        const {userId} = jwt.decode(token)

        await User.findByIdAndDelete(userId)
        res.json({message: "Utilisateur supprimé"})
    } catch (err) {
        console.error(err)
        res.status(500).json({error: err})
    }
}