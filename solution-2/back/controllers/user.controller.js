const userModel = require ('../models/user.model.js');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const { env } = require('../config/data.js');

const inscription = async (req, res) => {
  try {
    const { pseudo, mail, motdepasse, avatar } = req.body
    // on récupère toutes les infos dans la requête pour propulser les données utilisateur dans la BDD
    const userExiste = await userModel.findOne({ mail: mail });
    if (userExiste) {
      return res.status(409).send('Cet email est déjà utilisé');
    }
    const passwordHashed = await bcrypt.hash(motdepasse, 10);

    console.log(req)
    const newUser = await userModel.create({
        pseudo: pseudo, 
        mail: mail,
        motdepasse: passwordHashed,
        avatar: avatar,
        filmsAimes: [],
        filmsVus: [],
        filmsAVoir: []
    });

    res.status(201).json({message : "Nouvel utilisateur créé !", user: newUser})
  } catch (err) {
    res.status(500).send('Erreur lors de la création de l\'utilisateur.');
  }
}

const connexion = async (req, res) => {
  try{
    const data = req.body;
    const mailData = data.mail
    const motdepasseData = data.motdepasse
    // Recherche utilisateur par son email
    const user = await userModel.findOne({ mail: mailData })
    // Regarde si le mot de passe correspond à celui de la bdd
    const compareMDP = await bcrypt.compare(
      motdepasseData,
      user.motdepasse
    )

    // Si l'un ou l'autre ne sont pas valides, renvoyer un code 404
    // L'erreur est volontairement floue pour ne pas donner d'informations à un utilisateur malveillant
    if (!user || !compareMDP) {
      return res.status(404).send("E-mail ou mot de passe invalide!") 
    }
    
    // JWT Token
    const token = jwt.sign(
      // id de l'utilisateur
      { id: user._id }, 
      // clé secrète signant le token
      env.token, 
      // expiration du token au bout de 24h
      { expiresIn: "24h"}
    )

    const { motdepasse, ...others } = user._doc
    
    // Envoie le jeton (token) JWT sous forme de cookie HTTPOnly
    res.cookie('access_token', token, { httpOnly: true })
    .status(200)
    .json(others) 
  } catch(error) {
    res.status(400).send('Erreur lors de la connexion.');
  }
}

const recupUser = async (req, res) => {
  try {
    const users = await userModel.find();
    console.log(JSON.stringify(users))
    res.json(users);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération de l\'utilisateur.');
  }
}

const infosUser = async (req, res) => {
  try {
    console.log("test")
    const user = await userModel.findOne({ mail: req.body.mail });
    user.motdepasse = undefined; // ne pas garder le mot de passe pour des raisons de sécurité
    res.json(user);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des données utilisateur.');
  }

}

const recupDonneesUser = async (req, res) => {
  try {
    const { _id, type, filmId } = req.body;
    const validTypes = ["filmsAimes", "filmsVus", "filmsAVoir"];
    
    // Vérifier si le type fourni est valide
    if (!validTypes.includes(type)) {
        return res.status(400).send("Type de donnée non valide");
    }

    const user = await userModel.findById(_id);
    if (!user) {
        return res.status(404).send("Utilisateur non trouvé");
    }

    // Vérifie si le film est déjà dans la liste spécifiée
    const list = user[type];
    const operation = list.includes(filmId) ? '$pull' : '$push';

    // On met à jour le document en fonction de la liste spécifiée
    await userModel.findByIdAndUpdate(_id, { [operation]: { [type]: filmId } });
    
    res.send("Liste mise à jour avec succès");
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des données utilisateur.');
    res.status(500).json({ msg: err.message });
  }
}

module.exports = { inscription, connexion, recupUser, infosUser, recupDonneesUser };