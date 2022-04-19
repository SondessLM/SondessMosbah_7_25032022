// importer le package express
const express = require('express');

// creer des routes individuelles grace router express
const router = express.Router();

//creer constante pour l'authentification
const auth = require('../middleware/auth');

//creer constante pour gerer les images
const multer = require('../middleware/multer-config');

//Importer le controller.
const userCtrl = require('../controllers/user');

//Importer les middleware.
const validateEmail = require("../middleware/signup/validate-email");
const validatePassword = require("../middleware/signup/validate-password");


//Routes pour s'inscrire.
router.post('/signup', validateEmail, validatePassword, userCtrl.signup );

//Routes pour se connecter.
router.post('/login', validateEmail, userCtrl.login );

const userCtrl = require('../controllers/user');

//Route pour recupèrer tous les utilisateurs
router.get('/', auth, userCtrl.getAllUsers);

//Routes pour créer un utilisateur
router.post('/', auth, multer, userCtrl.createUser);

//Route pour recupèrer utilisateu avec son ID
router.get('/:id', auth, userCtrl.getOneUser);

//route pour permettre de suprrimer utilsateu
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;