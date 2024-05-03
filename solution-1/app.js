const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Film = require('./models/film.model.js');

const { saveFilms, recupChanges } = require('./controllers/film.controller.js');

const app = express();
app.set('view engine', 'ejs');

let films;

//MiddleWare pour parser le corps des requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
    .connect('mongodb://localhost:27017/filmo')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log("Connexion à MongoDB échouée !", err))

app.get("/", async(req, res) => {
    try {
        films = await Film.find();
        res.render("index", { films: films});
    }
    catch(err) {
        console.log('Erreur lors de la récupération des données : ' + err);
        res.status(500).send("Erreur lors de la récupération des données");
    }
})

app.listen(3001, () => {
    console.log('Serveur démarré sur http://localhost:3001');
    // Sauvegarde Films BDD
    saveFilms();
    // Réimport si actualisation
    recupChanges();
})