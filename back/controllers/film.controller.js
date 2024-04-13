const xlsx = require('xlsx');
const fs = require('fs');
const getFilmModel = require('../models/film.model.js');
const { Int32 } = require('mongodb');


/**
 * Cette fonction récupère le fichier Excel sous forme de worksheet et le renvoie un JSON
 * @return {JSON} - JSON des données Excel
 */
const getExcelFilms = () => {
  try {
    const workbook = xlsx.readFile("./xlsx/film.xlsx"); // TO DO: mettre le path en environnement
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      throw new Error("Echec de la lecture du fichier Excel.");
    }

    return xlsx.utils.sheet_to_json(sheet);
  } catch (err) {
    // permet aux middlewares de récupérer le contenu de l'erreur
    throw err;
  }
};

/**
 * Fonction mettant au format Mongo les données de l'Excel. Traite les doublons et les données de scrapping.
 * @param {Array} films - Tableau d'objets
 * @return {Array} - Un tableau d'objets JS
 */
const formatExcelFilms = (films) => {
  const filmsUniques = [];
  const listeFilms = films.map((film) => {
    // on utilise some pour voir si un élément du tableau est équivalent à l'item actuel
    const isDuplicate = filmsUniques.some(
      (item) => item.id === film.Id || item.titre === film.Titre
    );

    // on ne veut ajouter que les films uniques
    if (!isDuplicate) {
      filmsUniques.push({ id: film.Id, titre: film.Titre });

      // cc Flo, on purge les données poubelle
      const regexRemoveAngleBrackets = /<[^>]*>/g;

      // on reprend le format du schéma
      return {
        id: film.Id,
        titre: film.Titre,
        realisateurs: film["Réalisateurs"],
        annee: film["Année de production"],
        nationalite: film["Nationalité"],
        duree: film["Durée"],
        genre: film.Genre,
        synopsis: film.Synopsis.replace(regexRemoveAngleBrackets, ""),
      };
    }
  });

  // On retourne le tableau des films définis.
  return listeFilms.filter((film) => typeof film !== "undefined");
};

/**
 * Cette fonction récupère le fichier Excel sous forme de worksheet et le renvoie un JSON
 * @return {JSON} - JSON des données Excel
 */
const saveFilms = async () => {
  try {
    const films = getExcelFilms();
    console.log("Les films ont été récupérés");

    const formatFilms = formatExcelFilms(films);
    console.log("Les films sont désormais compatibles avec Mongo");

    // Sauvegarde si BDD vide, sinon mise à jour
    const totalFilms = await nbFilms();
    const Film = await getFilmModel();

    // Suppression des films obsolètes
    const allExcelIds = formatFilms.map((film) => film.id);
    const allFilms = await Film.find();

    const idsObsolete = allFilms
      .filter((film) => !allExcelIds.includes(film.id))
      .map((film) => film.id);
    
    if (idsObsolete.length > 0) {
      const deletedFilms = await Film.deleteMany({
        id: { $in: idsObsolete }, // $in sélctionne les documents dont la valeurs est équivalent à n'importe quelle valeur de l'array
      });
      console.log(deletedFilms.deletedCount + " film(s) supprimé(s)");
    }

    // Actions sur la BDD (import, mise à jour)
    if (totalFilms > 0) {
      const bulkData = prepareRequeteBulk(formatFilms);
      await Film.bulkWrite(bulkData);
      console.log("Films mis à jour dans la base de données.");
    } else {
      await Film.insertMany(formatFilms);
      console.log("Films importés dans la base de données.");
    }
  } catch (err) {
    throw err;
  }
};


/**
 * Récupère les changements dans le fichier Excel et sauvegarde les fichiers si changements il y a.
 * @return {null} - Ne retourne rien
 */
const watchChanges = () => {
  fs.watch("./xlsx/film.xlsx", { persistent: true }, (eventType) => {
    // eventType: "rename" | "change" |
    if (eventType === "change") saveFilms();
  });
  console.log("Lecture de film.xlsx en cours...");
};


/**
 * Compte le nombre de films dans l'Excel suivant un modèle.
 * @return {Int32} - Nombre de films
 */
const nbFilms = async () => {
  try {
    const Film = await getFilmModel();
    return Film.countDocuments();
  } catch (err) {
    throw err;
  }
};

/**
 * Cette fonction prépare les requêtes updates de chaque film récupéré du fichier Excel
 * @param {Array} formatFilms - Tableau d'objets
 * @returns {Array} - dataset à envoyer
 */
const prepareRequeteBulk = (formatFilms) => {
  /* Requête BULK: on effectue cette requête pour charger tout le jeu de données en une fois au lieu de n requêtes séparées
    filter: filtre par ID
    update: modifie le film
    upsert: crée l'objet s'il n'existe pas
  */
  const dataset = formatFilms.map((film) => ({
    updateOne: {
      filter: {
        id: film.id,
      },
      update: film,
      upsert: true,
    },
  }));
  return dataset;
};

module.exports = { saveFilms, watchChanges };