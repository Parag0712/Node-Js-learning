var express = require('express');
const userModel = require('./users');
const postModel = require('./post');
var router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//route make user
router.get('/createUser', async (req, res) => {
  try {
    let createdUser = await userModel.create({
      username: "Parag",
      password: "Parag123",
      posts: [],
      email: "paragvadgam123@gmail.com",
      fullName: "parag vadgama"
    })
    res.send(createdUser)
  } catch (error) {

    console.log(error);
  }
})

//route make post
router.get('/createdPost', async (req, res) => {
  try {
    const createdPost = await postModel.create({
      postText: "Hello jeel",
      user:"659d28e3c7a8093448e3dbfa"
    })
    const user = await userModel.findOne({_id:"659d28e3c7a8093448e3dbfa"})
    user.posts.push(createdPost._id)
    await user.save()
    res.send(createdPost)
  } catch (error) {
    console.log(error);
  }
})

//route all user
router.get('/allusersposts',async (req,res)=>{
  let user = await userModel.findOne({_id:"659d28e3c7a8093448e3dbfa"}).populate('posts') 
  res.send(user)
})

module.exports = router;
