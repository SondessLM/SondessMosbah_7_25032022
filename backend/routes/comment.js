const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const multer= require('../middleware/multer-config');
const commentCtrl = require('../controllers/comment');



module.exports= router;