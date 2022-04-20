const router = require('express').Router();

const userController = require('../controllers/user');

router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.get('/user/logout', userController.logout);

router.get('/user/', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

//Importer les middleware.
const validateEmail = require("../middleware/user/signup/validate-email");
const validatePassword = require("../middleware/user/signup/validate-password");

//Routes pour s'inscrire.
router.post('/signup', validateEmail, validatePassword, userController.signup );

//Routes pour se connecter.
router.post('/login', validateEmail, userController.login );

module.exports = router;