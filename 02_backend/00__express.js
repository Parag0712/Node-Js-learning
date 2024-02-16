const express = require('express')
const app = express()
let c =0

// route se phele chalta hai middleware
app.use(function(req,res,next){
    //counterx

    // res.send(`${c}`)
    // c++
    console.log("Hello ");
    next() //next middleware 
})
app.use(function(req,res,next){
    console.log("Helo2");
    next() //next route
})

app.get('/', function (req, res,next) {
    res.send('\nHello Hello Worlds')
})
app.get('/Home', function (req, res) {
    res.send('Home')
})


app.get('/Home/H', function (req, res) {
    res.send('Home/h')
})


app.listen(3000)