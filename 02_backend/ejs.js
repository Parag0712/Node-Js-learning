// ejs setup step
//1) ejs install
    //npm i ejs
//2) configure ejs
    //app.set("view engine","ejs");
//3)ek views name ka folder

//4)usmein ejs file banavo

//5)send ki jagar render karo
    //render karte waqt make sure aap views ke folder ke ander wali koi file kaa name likhein,aur usmein ejs add na kare
    //.ejs not mentions

const express = require('express')
const app = express()
const port = 3000

app.set("view engine", "ejs")
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.render("index", { age: 12 })
})

app.get("/error",function(req,res,next){
    // new Error
    throw Error("Something")
})

app.get("/404",function(req,res,next){
    // new Error
    throw Error("404")
})

app.get('/contact/:username?&:pass?', (req, res) => {
    res.render("contact", { name: req.params.username, pass: req.params.pass })
})

app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})