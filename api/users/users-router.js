const express = require('express');
const User = require('../users/users-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');
const Post = require('./../posts/posts-model');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();







router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
});	


router.get('/:id', validateUserId,(req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  User.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
});



router.post('/',validatePost ,(req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert({name: req.name})
  .then(newUser => {
    res.status(201).json(newUser)
}).catch(error => {
  console.log(error)
  res.status(500).json({ message:  "missing required text field"})
})
  
  })




router.put('/:id', validateUserId, validateUser,(req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid


  // User.update(req.params.id, req.body)
  User.update(req.params.id, {name: req.name})
  .then(updatedUser => {
    if(updatedUser){
    res.status(200).json(updatedUser);
  
}else {
    res.status(404).json({ message: 'The user could not be found' })
}
  })
  .catch(err => {
    console.log(err)
      //res.status(500).json({message: 'message: error.messageThere was an error updating the user'});
      res.status(500).json({ message:' error.message'});
  });
	
})

router.delete('/:id',validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
    User.remove(req.params.id, req.query.name)
  .then((user) => {
    console.log(user)
    res.status(200).json(` ${user.id} and ${user.name} has been deleted`)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'There was an error deleting the user'})
  })
});	



router.get('/:id/posts', validateUserId,(req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
     .then( userPosts => {
      res.status(200).json(userPosts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'error getting posts from user'});
    });
});	




router.post('/:id/posts',validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  req.body.user_id = req.params.id;
  Post.insert(req.body)
  .then(newPost => {
    res.status(200).json(newPost);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'There was an error adding the post'});
  });
});	




// do not forget to export the router
module.exports = router;