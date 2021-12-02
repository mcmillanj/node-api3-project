
const User = require('../users/users-model');
//  const Post = require('../posts/posts-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`${req.url}, ${req.method},${ Date.now()}`)
  next()

}

  function validateUserId(req, res, next) {
    
 // DO YOUR MAGIC
  const { id } = req.params;
  User.getById(id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: 'user not found'});
    }
  })
  .catch(next);
}	



function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if(!name || !name.trim()){
    res.status(400).json({message: 'Missing name'});
  } else {
    req.name = name.trim()
    next();
  }
}	

function validatePost(req, res, next) {

  const {text} = req.body

  // DO YOUR MAGIC
  if(!req.body.text)
  {
    res.status(400).json({ message:'missing required text field'});
    
  }
   else {
req.text = text.trim();
    next();
  }
}	




// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validateUserId,
  validateUser,
  validatePost
}  