// noinspection JSValidateTypes
const mongoose = require('mongoose')
const {characterSchema} = require("./Character");

// noinspection JSValidateTypes
const userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Veuillez entrer une adresse email valide']
        },
        password: {
            type: String,
            required: true,
        },
        characters: {
            type: [characterSchema],
            required: false,
            unique: false
        }
    }, {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)
module.exports = User