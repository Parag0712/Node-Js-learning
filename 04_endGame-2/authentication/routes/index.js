var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel = require('./users')


//inke vagese banda login kar payega vo heart use kar payyega
//use local strategy
const LocalStrategy = require('passport-local')
passport.use(new LocalStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('index', { title: 'Express' });
}); 

//isLoggedIn middleware 
router.get('/profile', isLoggedIn,function(req, res, next) {
  res.render("profile",{username:req.session.username})
}); 

//register
router.post('/register',function(req,res){
    let userData = new userModel({
    username:req.body.username,
    secret:req.body.secret
  })


  userModel.register(userData,req.body.password).then(
    function(registeruser){
      passport.authenticate("local")(req,res,function(){
        req.session.username = req.body.username;
        res.redirect('/profile' )
      })
    }
  )
})

//login
router.post("/login",passport.authenticate("local",{
  // successRedirect:"/profile",//if id/pass shi ho to success redirect
  // failureRedirect:"/"
}),function(req,res){
  req.session.username = req.user.username;
  res.redirect('/profile')
})


//logout
router.post('/logout',function(req,res,next){
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect('/')
  });
})


// user account creted using this register function
// this function return promise



//check login or not
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/")
}

module.exports = router;
