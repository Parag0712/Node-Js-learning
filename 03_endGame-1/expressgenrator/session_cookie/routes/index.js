var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next) {
  req.session.username = "parag";
  res.render('index', { title: 'Express' });
});

router.get("/checkusername", function (req, res) {
  console.log(req.session);
  if (req.session.username == "parag") {
    res.send("Login")
  } else {
    res.send("username wrong")
  }
  // Session {
  //   cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
  //   username: 'parag'
  // }
})

router.get("/unsetusername", function (req, res) {
  console.log(req.session);
  if (req.session.username == "parag") {
    req.session.destroy(function (err) {
      if (err) throw err
      res.send("removed")
    })
  } else {
    res.send("first set session")
  }
})

// creation session 
//we need one package 
//npm i express-session

router.get("/createCookie",function(req,res){
    res.cookie("color","red")
    res.render("index",{title:"cookie"})
})

router.get("/readCookie",function(req,res){
  if(req.cookies.color){
      res.send(req.cookies.color)
    }else{
      res.send("Cookie not Set")
    }
})

router.get("/deleteCookie",function(req,res){
  if(req.cookies.color){
    res.clearCookie("color")
  }else{
    res.send("not set")
  }
  res.send()
})

//creating session
module.exports = router;
