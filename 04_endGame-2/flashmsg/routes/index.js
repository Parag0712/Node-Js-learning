var express = require('express');
var router = express.Router();
const { userModel } = require('./users')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
// ------------------------------------------------------------------------------------------
router.get('/login', function (req, res, next) {
  //login ho jaye to profile page dikhado
  //agar na ho to error ,mujhe is route se kisi aur route lejao jaise ki error and waha

  //flash message aapko ye allow karte hai ki aap is route mein bane huye data ko doosre route mein use kar sakte

  res.render('index', { title: 'Express' });
});


router.get('/failed', function (req, res, next) {
  req.flash("chacha", 12);
  req.flash("name", "parag");
  res.send("ban gaya be")
});

router.get('/checkKaro', function (req, res, next) {
  console.log(req.flash("chacha"));
  console.log(req.flash("name"));
  res.send("check karlo be ke terminal pe")
});


// ------------------------------------------------mongodb-------------------------------------------

router.get("/create", async function (req, res) {
  const createUser = await userModel.create(
    {
      username: "paraggg",
      nickname: "paraggg",
      description: "i am study in bca and my hobby is playing cricket",
      categories: ['business', 'fashion', 'design'],
    }
  );
  res.send(createUser)
});

router.get("/reading", async function (req, res) {
  /* --Q1) How can I perform a case-insensitive search in Mongoose? */
  
    //i stand for insensitive

  // let regex = new RegExp("PaRag", 'i')
  // let regex = new RegExp("^ParaG$", 'i')


  /* --Q2  How do I find documents where an array field contains all of a set of values?*/

  // const showUser = await userModel.find({ username: regex })
  // const showUser = await userModel.find({categories:{$all:['fashion','react']}})
  // const showUser = await userModel.find({$or :[{categories:'fashion'},{categories:'react'}]})


  /* --Q3  How can I search for documents with a specific date range in Mongoose?*/

  // var date = new Date('2024-01-06')  //from
  // var date2 = new Date('2024-01-07') //to
  // const showUser = await userModel.find({dateCreated:{$gte:date ,$lte:date2 }});


  /* --4) How can I filter documents based on the existence of a field in Mongoose?*/

  // const showUser = await userModel.find({categories:{$exists:true}}) //if categories exists then data give
  // const showUser = await userModel.find({categorie:{$exists:true}}) //if categories exists then data give

  /* --5) How can I filter documents based on a specific field's length in Mongoose?*/

  const showUser = await userModel.find({
    //return specific length value
    $expr:{
      $and:[
        {$gte: [{$strLenCP:'$nickname'},0]},
        {$lte: [{$strLenCP:'$nickname'},11]}
      ]
    }
  })



  res.send(showUser)
});

module.exports = router;
