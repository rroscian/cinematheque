const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const { Schema } = mongoose;

/**
 * Définit le schéma de notre utilisateur
 * @return {JSON} - JSON du schéma de notre utilisateur
 */
const userSchema = new Schema({
    pseudo: {
        type: String,
        required: true,
        unique: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    motdepasse: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    filmsAimes: {
        type: Array
    },
    filmsVus: {
        type: Array
    },
    filmsAVoir: {
        type: Array
    }
},
{ timestamps: { createdAt: true } }
);
userSchema.plugin(validator);

const User = mongoose.model("user", userSchema);

module.exports = User;