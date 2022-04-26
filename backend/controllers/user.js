// npm: Crypter les informations (hasher mot de pass)
const bcrypt = require('bcrypt');

//Importer shema model user.
const User = require('../models/user');

//Sécuriser la connexion au compte: token user.
const jwt = require('jsonwebtoken');

//Importer variable d'environnement.
require('dotenv').config();

// Injecter le module FyleSystem qui permet de modifier, ajouter, suprimer des fichiers
const fs = require('fs');

/**
 * Register user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.register = (req, res, next) => {
    if(req.body.email == null || req.body.email == '' || req.body.firstName == null || req.body.firstName == ''|| req.body.password == null || req.body.password == '' || req.body.lastName == null || req.body.lastName == '') {
        return res.status(400).json({ error: 'Veuillez enseigner tous les champs' });
    }
     //Hasher 10 fois le mot de passe.
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    //Créer un nouvel utilisateur.
    const user = new User({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        job: false,
    });
    //Enregistrement du nouvel utilisateur dans la BDD.
    user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => res.status(400).json({ error }));
      // .catch(error => res.status(400).json({ message : error.errors.email.message }));
  })
  .catch(error => res.status(500).json({ error }));

};

/**
 * Login user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = (req, res, next) => {
    //chercher l'utilisateur dans BDD
  User.findOne({ email: req.body.email })
  .then((user) => {
    console.log("user", user);
    //Utilisateur non trouvé
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    //Comparer les mot de passes
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        console.log("validation", valid);
        //mot de passe non valable 
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        //Envoie un objet json avec le userId et token
        res.status(200).json({
            userId: user._id,
            // encoder un nouveau token la fonction sign de jwt 
            token: jwt.sign(
              //ajoute user id 
              { userId: user._id },
              //Ajouter une chaine secrète de développement temporaire
              'RANDOM_TOKEN_SECRET',
              //Fin de validité du token à 24H
              { expiresIn: '24h' }
            )
          });
      })
      .catch(error => res.status(500).json({error }));
  })
  .catch(error => res.status(500).json({ error }));
};


/**
 * Logout user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json("OUT");
};

/**
 * Get all users.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getAllUsers = (req, res, next) => {
    User.findAll({attributes : ['id', 'email', 'firstName', 'lastName', 'status']})
    .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

/**
 * Get a user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getUser = (req, res, next) => {
    User.findOne({
        where: {id: req.params.id}
      })
      .then((user) => res.status(200).json(user))
      .catch(error => res.status(400).json({error:error}))
    };

/**
 * Update a user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateUser = (req, res, next) => {
    User.findByPk(req.params.id)
    .then((oldUser) => {
      if (oldUser.id !== req.auth.userId) {
        return res.status(403).json({
          error: new Error('Unauthorized request!')
        });
      }
      User.update({ ...req.body}, { where: { id: req.params.id } })
            .then(() => res.status(200).json({
              message: 'Profil modifié !',
              users : {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
              
              }
            }))
            .catch((error) => res.status(400).json({
              error
            }))
          });
};

/**
 * Delete a user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteUser = (req, res, next) => {
    ser.findOne ({
        where: {id :req.params.id}
      })
      .then(users => {
        if (users.id !== req.auth.userId) {
          console.log(req.auth.userId);
          console.log(users.id);
            return res.status(401).json({
              error : new Error('requete !')
            })
          } else {
      User.destroy({where: {id: req.params.id}})
      .then(() => res.status(200).json({message: 'Compte supprimé !'}))
      .catch(error => res.status(400).json({error}));
         
       } })
        .catch(error => res.status(500).json({error}));
    };