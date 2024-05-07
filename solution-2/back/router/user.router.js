const express = require('express');
const { inscription, connexion, recupUser, infosUser, recupDonneesUser, recupUsers, recupOneUser } = require('../controllers/user.controller.js');

const router = express.Router();

router.get("/recupUser", recupUsers);
router.post("/inscription", inscription);
router.post("/connexion", connexion);
router.post("/infosUser", recupOneUser);
router.post("/recupDonnees", recupDonneesUser);

module.exports = router;