//importer le framework express de node.js (creer des appli web avec node)
const express = require('express');

// analyser les corps de requête entrants dans un middleware ,disponible sous la propriété req.body.
const bodyParser =  require('body-parser');

//donner un moyen d’utiliser des répertoires et des chemins d’accès aux fichiers
const path = require('path');

//limiter les demandes répétées aux API par le package express rate limit 
const rateLimit = require('express-rate-limit');

// configurer de manière appropriée des en-têtes HTTP 
const helmet = require('helmet');

//const user =  require ('./routes/user');

//const users =   require('./routes/user');

//const post = require('./routes/post');

//const comment= require('./routes/comment');

const User = require('./models/user');

const mysql = require('mysql2');

//const db = require('./models');

//db.sequelize.sync({force: false});

//configurer express rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limiter a 100 les requetes de chaque IP pendant 15 minutes
  standardHeaders: true, // Retourner rate limit info à `RateLimit-*` headers
  legacyHeaders: false, 
});


const app = express();

// Gerer CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cache-Control', 'max-age=31536000');
  next();
});

 //Analyser le corps de requtes avec la fonction express
 app.use(express.json());

// protéger l'application contre certaines vulnérabilités
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// secure HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Envoyer toutes les demandes entrantes sous forme de Json
app.use(bodyParser.json());

//renvoyer le corps de la requette sous forme de Json
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }))

// //Gerer les images 
app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/api/user', User);
//app.use('/api/post', post);
//app.use('/api/comment', comment);

// exporter le module
module.exports = app;



