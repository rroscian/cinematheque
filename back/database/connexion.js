const mongoose = require('mongoose');

let movieDB;

/**
 * Cette fonction établit une connexion aux bases de données Movies et Users
 * @returns {Object} - Object contenant les deux bases de données
 */
const connexionBDD = async () => {
  try {
    // 1. Promesses de connexion aux bases de données
    const movieDBPromise = await mongoose
      .createConnection('mongodb://localhost:27017/filmo', {
        dbName: 'film',
      })
      .asPromise();

    // 2. Consommer les promesses
    [movieDB] = await Promise.all([movieDBPromise]);

    console.log("Connexion à mongoDB réussie !");

    return { movieDB };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = connexionBDD;