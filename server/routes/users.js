const express = require('express');
const {getUser, postRegister, postLogin, updateProfile, deleteProfile} = require("../controllers/UserController");
const router = express.Router();

router.get('/', getUser);
router.post("/", postRegister);
router.put("/", updateProfile);
router.delete("/", deleteProfile)
router.post("/login", postLogin);

module.exports = router;
