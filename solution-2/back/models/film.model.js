const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const { Schema } = mongoose;

/**
 * Définit le schéma de notre film
 * @return {JSON} - JSON du schéma de notre film
 */
const filmSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    titre: {
        type: String,
        required: true,
        unique: true
    },
    titreOriginal: {
        type: String
    },
    realisateurs: {
        type: String,
        required: true
    },
    annee: {
        type: Number,
        required: true
    },
    nationalite:{
        type: String,
        required: true
    },
    duree: {
    type: String,
    required: true,
    },
    genre: {
    type: String,
    },
    synopsis: {
    type: String,
    required: true,
    }
},
{ timestamps: { createdAt: true } }
);
filmSchema.plugin(validator);

const Film = mongoose.model("film", filmSchema);

module.exports = Film;