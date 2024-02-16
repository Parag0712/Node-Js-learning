var express = require('express');
const passport = require('passport');
var LocalStrategy = require('passport-local');
const userModal = require('./users');
const upload = require('./multerSetup');
const postModel = require('./post');
const { User } = require('../../../Hitesh Chaudary/Youtube/src/models/user.models');
var router = express.Router();

upload
// SETUP

passport.use(new LocalStrategy({ usernameField: 'email' }, userModal.authenticate()))


// ------------------------------------------------------ GET ROUTES ---------------------------------------------------------

// Route: /
// Description: Render the index page
router.get('/', isLoggedIn, async function (req, res, next) {
  const post = await postModel.find().populate("user");
  const user = await userModal.findOne({ email: req.session.passport.user });

  res.render('index', { title: 'Index', posts: post, nav: true, users: user });
});


// Route: /register
// Description: Render the registration page
router.get('/register', isAllLoggedIn, function (req, res, next) {
  res.render('register', { title: 'Register', errors: req.flash("error"), nav: false });
});

// Route: /login
// Description: Render the login page
router.get('/login', isAllLoggedIn, function (req, res, next) {
  res.render('login', { errors: req.flash("error"), title: "Login", nav: false });
});


// Route: /profile
// Description: Render the profile page
router.get('/profile', isLoggedIn, async (req, res) => {
  const user = await userModal.findOne({ email: req.session.passport.user }).populate("posts")
  res.render('profile', { title: "Profile", users: user, nav: true, posts: user.posts })
})


// Route: /createpins
// Description: Render createpins page
router.get('/createpins', isLoggedIn, async (req, res) => {
  const user = await userModal.findOne({ email: req.session.passport.user })
  res.render('createpins', { title: "CreatePins", users: user, nav: true })
})

//Route: /feed
//Description: Redirect on /
router.get('/feed', async function (req, res) {
  res.redirect('/');
})


router.get('/show', async function (req, res) {
  const user = await userModal.findOne({ email: req.session.passport.user }).populate("posts");
  res.render('show', { title: 'Your Feeds', posts: user.posts, nav: true, users: user });
})


//Route: /feed
//Description: Redirect on /
router.get('/preview/:id', async function (req, res) {
  const userPost = await postModel.findOne({_id:req.params.id}).populate("user")
  res.render('preview',{title:"Show Image" ,post:userPost,nav:true,users:userPost.user});
})


// Route: /logout
// Description: logout page
router.get('/logout', (req, res) => {
  req.logOut(function (err) {
    if (err) { return next(err); }
    req.session.destroy()
    res.redirect("/login")
  })
})

// ------------------------------------------------------ POST ROUTES --------------------------------------------------------

// Route: /register
// Description: Handle registration form submission
router.post('/register', isAllLoggedIn, async function (req, res, next) {
  const userData = new userModal({
    username: req.body.username,
    name: String,
    email: req.body.email,
    contact: req.body.contact,
    profileImage: "default.png"
  });

  // passport.js register function  
  userModal.register(userData, req.body.password)
    .then(() => {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile');
      });
    })
    .catch((err) => {
      console.error('Error during registration:', err);
      // Check for specific error conditions and customize flash messages
      if (err.name === 'UserExistsError') {
        req.flash('error', 'A user with that email or username already exists.');
      } else {
        req.flash('error', 'Registration failed. Please try again.');
      }
      return res.redirect('/Register'); // Redirect to registration page
    })

});


// Route: /login
// Description: Handle login form submission
router.post('/login', isAllLoggedIn, passport.authenticate("local", {
  successFlash: true,
  failureFlash: true,
  failureRedirect: "/login",
}), (req, res) => {
  req.flash("success", "Welcome back!")
  res.redirect("/profile");
})


// Route: /profilepisupload
// Description: upload profile pic in databse
router.post("/profilepicupload", isLoggedIn, upload.single('profileImage'), async (req, res) => {
  const user = await userModal.findOne({ email: req.session.passport.user })

  user.profileImage = req.file.filename;
  await user.save()
  res.redirect("/profile")
})

// {
//   "fieldname": "profileImage",
//   "originalname": "blue-radha-and-krishna-4k-two8s47ba1ahdzfn.webp",
//   "encoding": "7bit",
//   "mimetype": "image/webp",
//   "destination": "./public/images/uploads",
//   "filename": "76d407ed-f62c-4c89-8abe-df443d7d3960.webp",
//   "path": "public\\images\\uploads\\76d407ed-f62c-4c89-8abe-df443d7d3960.webp",
//   "size": 516106
// }


// Route: /createpost
// Description: Create Post
router.post("/createpost", upload.single("postimage"), async function (req, res) {

  const user = await userModal.findOne({ email: req.session.passport.user })
  const userPost = await postModel.create({
    user: user._id,
    posttitle: req.body.title,
    postdescription: req.body.description,
    postimage: req.file.filename
  })


  user.posts.push(userPost._id)
  await user.save()
  res.redirect("/profile")
})
// createpost
// ------------------------------------------------------FUNCTION -------------------------------------------------------------

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login")
}



function isAllLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/")
  }
  return next()
}
module.exports = router;
