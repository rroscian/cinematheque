const Film = require('../models/film.model.js');

/**
 * Cette fonction récupère les films de la Base de Données pour usage
 * @return {JSON} - JSON contenant les données de tous les films
 */
const recupFilms = async(req, res) => {
  try {
    films = await Film.find();
    res.status(200).json(films);
  } catch(err) {
    // console.log('Erreur lors de la récupération des films:' + err)
    res.status(500).send('Erreur lors de la récupération des films.');
  }
}

/**
 * Cette fonction récupère un nombre de films de la Base de Données pour usage
 * @param nombre - nombre de films à récupérer
 * @return {JSON} - JSON contenant les données du nombre de films
 */
const recupNbFilms = async(req, res) => {
  try {
    const films = await filmModel.find().limit(25);
    res.status(200).json(films);
  } catch (err) {
    // console.log('Erreur lors de la récupération des 25 films:' + err)
    res.status(500).send('Erreur lors de la récupération des 25 films.');
  }
}

/**
 * Cette fonction récupère un film de la Base de Données selon son ID
 * @return {JSON} - JSON contenant les données du film
 */
const recupFilmParId = async (req, res) => {
  try {
    console.log('test')
    const film = await filmModel.findById(req.params.id);
    res.status(200).json(film);
  } catch (err) {
    // console.log('Erreur lors de la récupération du film ' + req.params.id + ': '+ err)
    res.status(500).send('Erreur lors de la récupération du film ' + req.params.id);
  }
}

const rechercheFilm = async (req, res) => {
  try {
    const films = await filmModel.find({ titre: { $regex: req.params.titre, $options: "i" } });
    res.status(200).json(films);
  } catch (err) {
    // console.log('Erreur lors de la recherche des films:' + err)
    res.status(500).send('Erreur lors de la recherche des films.');
  }
}

module.exports = { recupFilms, recupNbFilms, recupFilmParId, rechercheFilm };