// noinspection JSUnresolvedReference

const mongoose = require("mongoose")
require("dotenv").config()

const connectToDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connexion à la base de donnée réussie")
    } catch (e) {
        console.error("Impossible de se connecter", e)
    }
}

const disconnectFromDb = async () => {
    try {
        await mongoose.disconnect()
        console.log("Déconnexion de la base de donnée réussie")
    } catch (e) {
        console.error("Déconnexion de la base de donnée impossible", e)
    }
}

const initDb = async () => {
    await connectToDb()
}

module.exports = {initDb, disconnectFromDb}