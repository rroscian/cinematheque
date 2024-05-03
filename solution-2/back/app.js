const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const cors = require('cors');
const filmRouter = require('./router/film.router.js');
const userRouter = require('./router/user.router.js');

// Port d'écoute de l'appli
const port = 3000;

mongoose
    .connect('mongodb://localhost:27017/filmo')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log("Connexion à MongoDB échouée !", err))

// Appli Express
const app = express();
app.use(express.json());

// MiddleWare pour parser le corps des requêtes POST
// app.use(bodyParser.urlencoded({ extended: true }));

// CORS, permet de prendre en charge les requêtes multi-origines
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// Préfixes des Routes
app.use("/api/films", filmRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
})