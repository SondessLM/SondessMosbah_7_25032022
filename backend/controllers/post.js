const post= require('../models/post');

// Injecter le module FyleSystem qui permet de modifier, ajouter, suprimer des fichiers
const fs = require('fs');

const Post = require('../models/post');;

// Creer une post
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    
    // likes: 0,
    // dislikes: 0,
    // usersLiked: [],
    // usersDisliked: []
  });
  post.save()
    .then(() => res.status(201).json({ message: 'la post est enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

/// Retrouver un post par son id et l'affichée
exports.getOnePost = (req, res, next) => {
  post.findOne({
    _id: req.params.id
  })  
    .then(post => res.status(200).json(post))     
    .catch(error => res.status(404).json({
      error: error,
    }));
};

//Modifier le post
exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const filename = post.imageUrl.split('/images/')[1];
      const oldUrl = post.imageUrl;
      if (!post) {
        return res.status(404).json({
          error: new Error('Pas de posts!')
        });
      }
      if (post.userId !== req.auth.userId) {
        return res.status(403).json({
          error: new Error('Réquete non authorisée!')
        });
      }
      if (req.file) {
        fs.unlink(`images/${filename}`, () => {
          const postObject = {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
              }`,
          }
          Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
            .then(() => res.status(200).json({
              message: 'le post est mis à jour!'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        })
      } else {
        const newPost = req.body;
        newPost.imageUrl = oldUrl;
        Post.updateOne({ _id: req.params.id }, { ...newPost, _id: req.params.id })
          .then(() => res.status(200).json({
            message: 'le post est mis à jour! !'
          }))
          .catch((error) => res.status(400).json({
            error
          }))
      }
    })
    .catch((error) => res.status(500).json({
      error
    }))
}


// Supprimer Un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: new Error('')
        });
      }
      if (post.userId !== req.auth.userId) {
        console.log(post.userId);
        console.log(req.auth.userId);
        return res.status(403).json({
          error: new Error('')
        });
      }
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      })
    }).catch(error => res.status(500).json({ error }));
};


//Affichage de tous les posts

exports.getAllPosts = (req, res, next) => {
  post.find().then(
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
// // like et dislike des posts
// exports.likepost = (req, res, next) => {
//   let like = req.body.like;
//   let userId = req.body.userId;
//   let postId = req.params.id;


//   if (like == 1) {
//      post.findOne({ _id: req.params.id })
//       .then((post) => { 
//         // Liké la post si l'utilisateur n'est pas enregistré dans les Likes
//         if (post.usersLiked.indexOf(userId) == -1 && post.usersDisliked.indexOf(userId) == -1) {
//             post.updateOne({ _id: postId }, {
//             $push: { usersLiked: userId }, $inc: { likes: +1 },
//           })
//             .then(() => res.status(200).json({ 
//               message: 'Like ajouté !'
//             }))
//             .catch((error) => res.status(400).json({
//               error
//             }))
//         } else {
//           //Ajouter un message si l'utilisateur a déjà liké
//          return res.status(403).json({ message: 'Vous avez déjà liké ou disliké le post !' })
//         }
//       }).catch((error) => res.status(400).json({
//         error
//       }))
//   } 

//   if (like == 0) {
//   post.findOne({ _id: postId })
//     .then((post) => {
//       // Liké la post si l'utilisateur n'est pas enregistré dans les Likes
//       if (post.usersDisliked.indexOf(req.body.userId) != -1) {
//         post.updateOne(
//           { _id: req.params.id },
//           // retrait de l'utilisateur du tableau usersDisliked + décrémentation du dislike
//           {
//             $pull: { usersDisliked: req.body.userId },
//             $inc: { dislikes: -1 },
//           }
//         )
//           .then(() => res.status(200).json({ message: "aucun avis" }))
//           .catch((error) => res.status(400).json({ error }));
//       }
//       // si l'utilisateur est présent dans le tableau des likes
//       if (post.usersLiked.indexOf(req.body.userId) != -1) {
//         post.updateOne(
//           { _id: req.params.id },
//           // Retirer de l'utilisateur du tableau usersliked et suprrimer le like
//           { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
//         )
//           .then(() => res.status(200).json({ message: "aucun avis" }))
//           .catch((error) => res.status(400).json({ error }));
//       }
//     })
//     .catch((error) => res.status(400).json({ error }));}



//   if (like === -1) {
//     post.findOne({ _id: req.params.id })
//       .then((post) => {
//         if (post.usersDisliked.indexOf(userId) == -1 && post.usersLiked.indexOf(userId) == -1) {
//           post.updateOne({ _id: postId }, {
//             $push: { usersDisliked: userId }, $inc: { dislikes: +1 },
//           })
//             .then(() => res.status(200).json({
//               message: 'Dislike ajouté !'
//             }))
//             .catch((error) => res.status(400).json({
//               error
//             }))
//         } else {
//           return res.status(403).json({ message: 'Vous avez déjà liké ou disliké le post !' })
//         }
//       }).catch((error) => res.status(400).json({
//         error
//       }))
//   }

// } 
