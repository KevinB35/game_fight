// noinspection JSValidateTypes
const mongoose = require('mongoose')

// noinspection JSValidateTypes
const characterSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        picture: {
            type: String,
            required: true,
        },
        strength: {
            type: Number,
            required: true,
        },
        stamina: {
            type: Number,
            required: true
        },
        defense: {
            type: Number,
            required: true
        },
        speed: {
            type: Number,
            required: true
        },
        techniques: {
            type: [String],
            required: true
        }
    }
)

const Character = mongoose.model('Character', characterSchema)
module.exports = {Character, characterSchema}