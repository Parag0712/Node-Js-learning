var express = require('express');
var router = express.Router();

const { addressModel, userModel } = require("./users")
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//insert data in mongodb
router.get('/create',async function(req, res, next) {
    const createUser = await userModel.create({
      username:"parag24",
      age: 1,
      name: "arag"
    })
    res.send(createUser)
});

router.get('/address',async function(req, res, next) {
  const createAddress = await addressModel.create({
    city:"rajkot",
    pincode:362150
  })
  res.send("hello")
});


//find give all data
router.get('/reading',async function(req,res){
    let allUser = await userModel.find()
    // res.send(allUser[0])
    res.send(allUser)
})

router.get('/readingAddress',async function(req,res){

  let address = await addressModel.find()
  // res.send(allUser[0])
  res.send(address)
})

//find1 send only one data
router.get('/find1',async function(req,res){
  let allUser = await userModel.findOne({$or: [{username:"parag24"},{age:12}] })
  //if not found then null
  console.log(allUser);
  // res.send(allUser[0])
  res.send(allUser)
})

router.get('/delete',async function(req,res){
  let deleteData = await userModel.findOneAndDelete({
    username:"parag24"
  })
  res.send(deleteData)
})
module.exports = router;
