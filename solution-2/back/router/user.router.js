const express = require('express');
const { inscription, connexion, recupUser, infosUser, recupDonneesUser } = require('../controllers/user.controller.js');

const router = express.Router();

router.get("/recupUser", recupUser);
router.post("/inscription", inscription);
router.post("/connexion", connexion);
router.get("/infoUser", infosUser);
router.post("/recupDonnees", recupDonneesUser);

module.exports = router;