// imports
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const path = require('path');

const app = express()
const port = process.env.PORT || 4000;

// database connection 
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true})

const db = mongoose.connection;
db.on('error',(error)=> console.log(error))
db.once('open',()=>console.log("Connected to the database!"));


//static paths
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"my key"
}))

// for access access message variable in ejs
app.use((req,res,next)=>{
    res.locals.message = req.session.message
    delete req.session.message
    next();
})

// template engine

app.set('view engine','ejs')

// route prefix
app.use("",require('./routes/route'))

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})