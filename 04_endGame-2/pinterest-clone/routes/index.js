var express = require('express');
const userModel = require('./users');
const postModel = require('./post');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const upload = require('./multerSetup')
var router = express.Router(); 


passport.use(new LocalStrategy({ usernameField: 'email', }, userModel.authenticate()))

// Register(home page) Route
router.get('/', isAllLoggedIn, async function (req, res, next) {
  res.render('index', { errors: req.flash("error"), title: "Register" });
});

// Profile Route
router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ email: req.session.passport.user })
  .populate("posts")

  res.render("profile", { user: user, email: req.session.passport.user, title: "Profile",posts:user.posts ,createpost:"Hello"})
});

// login Route
router.get('/login', isAllLoggedIn, async function (req, res, next) {
  res.render('login', { errors: req.flash("error"), title: "Login" })
});

// Feed Route
router.get('/feed', async function (req, res, next) {
  const post = await postModel.find();
  res.render('feed', { title: "Feed" ,posts:post});
});



//Route logout 
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.session.destroy()
    res.redirect('/login')
  });
})

// Post Req Register Router
router.post('/register', async function (req, res, next) {
  try {
    const userData = new userModel({
      email: req.body.email,
      username: req.body.username,
      fullname: req.body.fullname
    });

    // register Function 
    userModel.register(userData, req.body.password, (err) => {
      if (!err) {
        // login
        passport.authenticate('local')(req, res, function () {
          res.redirect('/profile');
        });
      }

      // if Error come
      if (err) {
        console.error('Error during registration:', err);
        // Check for specific error conditions and customize flash messages
        if (err.name === 'UserExistsError') {
          req.flash('error', 'A user with that email or username already exists.');
        } else {
          req.flash('error', 'Registration failed. Please try again.');
        }
        return res.redirect('/'); // Redirect to registration page
      }
    });
  } catch (error) {
    console.error('Unexpected error during registration:', error);
    return next(error); // Pass the error to the Express error handler
  }
});


// Post Req Login Router 
router.post("/login", passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: true
}), async function (req, res) {
  res.redirect('/profile')
})


// Post req for upload img
router.post("/upload", isLoggedIn,upload.single('postimage'),async (req,res)=>{
  if(!req.file){
    return res.status(404).send('No file were upload')
  }

  // jo file upload huyi hai usko karo save as post id user ko aur post ko user id 
  const user = await userModel.findOne({email:req.session.passport.user})
  
  const post=await postModel.create({
    posttext:req.body.posttext,
    postimage:req.file.filename,
    user:user._id 
  })

  user.posts.push(post._id);
  await user.save()
  res.redirect('/profile')
})



// isLoggedIn 
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login")
}


// if login then redirect profile 
function isAllLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/profile")
  }
  return next()
}
module.exports = router;
