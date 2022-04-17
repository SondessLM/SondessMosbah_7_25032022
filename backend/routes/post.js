const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const multer= require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.delete('/:id', auth, multer, postCtrl.deletePost);
router.get('/', auth, multer, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, multer, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.updatePost);
module.exports= router;