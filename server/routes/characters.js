const express = require('express');
const {addCharacter, listCharacters, getCharacter, deleteCharacter} = require("../controllers/CharacterController");
const router = express.Router();

router.post("/", addCharacter);
router.get("/", listCharacters);
router.get("/:id", getCharacter);
router.delete("/:id", deleteCharacter);

module.exports = router;