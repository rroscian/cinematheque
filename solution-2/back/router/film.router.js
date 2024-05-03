const express = require('express');
const { recupFilms, recupNbFilms, recupFilmParId, rechercheFilm } = require('../controllers/film.controller.js');

const router = express.Router();

router.get("/recupFilms", recupFilms);
router.get("/recupNbFilms", recupNbFilms);
router.get("/recupFilmID/:id", recupFilmParId);
router.get("/recherche/:titre", rechercheFilm);

module.exports = router;