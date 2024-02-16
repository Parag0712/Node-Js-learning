// how we use express
const express = require('express')
// using this require('express') we can add this package
const app = express();
//express() we run express now all ability come in this

// now you can access express functionality using app variable 
// middle ware
// function name res


app.use(function(req,res,next){
    //in req user data for example in req we have data of user (instagram user send req we our data will send)

    // if you want to user data you see in req
    // if you want to send some data or show some data you get in res
    // user send a name what is this name we get in req
    
    //req mai data hota hai from user
    //res mai code hota yha se kuch bhejane ke liye
    // here we send hello world using res.send("Hello world")

    // node ke sath ek dikkat hai ki agar control ek baar bhi kisi middleware pe gaya to control khud se agale route/middleware par nhi jayega,that why we have one method next() using this method we push

    // what is req?
        //for request

    //what is res 
        //get response from server

    //what is next
        //next is a 
    
    // console.log(req);
    // console.log(res);
    console.log(next);
    res.send("Hello middleware-1")
    next()  
})

// app.use(function(req,res,next){
//     res.send("Hello middleware-2")
//     next()
// })


// / main page
app.get('/', function (req, res) {
    res.send('Hello I am Parag Vadgama')
})

// /Profile
app.get('/profile', function (req, res) {
    res.send('Hello From profile a')
})

// middleware ek aisa function hota hai jo har route se phale chalta hai, isaka matlab saare routes mein koi bhi chale usse pahle
// middleware chalta hai and usmein likha code pahle execute hota hai

app.listen(3000)