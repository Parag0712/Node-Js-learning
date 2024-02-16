// Express Js is A package which behind the scene use  HTTPS available in npm
// using this package we can use server functionality(res,req,router)
// http code difficulty to write
// what is routing  /home,/about

// node vs express node is the main thing express ke code se hum server ka code likh pate and server kaisa react karega wo bhi express ke help se likhte hai

// what is express js package, routing 

// why express js - https is difficult to use ,express make this makes this easier

// routing - routes banane ke process ko hum kahte hai routing
// /profile
// /Home
// /contact
// /user/parag  

// what is middleware -  
// 

// request and response
    //1) request :- main saara data hota hai aane waale user ki req ki taraf ka,
    // jaise ki uski location,
    //device info and other things,
    //in request we have data

    //2) response :- main controls hote hai jinke basis pe hum server se response bhej paate hai
    //res have control

    //3) next :- next push the next things

// route parameters
    //facebook.com/profile/parag
    //facebook.com/profile/bhaiya
    //facebook.com/profile/vadgama
    //here we have different name after / so we can use parameter

    
    //this type routing called dynamic routing
    // aisa koi bhi route jiska koi hissa baar baar same rehata hai and kuch hissa baar baar change hota hai
    //iske liye aap dynamic route bana skte ho

    ///Home/:username&:password like this
    //to make any route dynamic you can use : at the place where you want to make it dynamic, and to access 
    //there value use req.params.nameOfParams

    //profile/:users
    //req.params.users

// template engines
    //markup (ejs,jade,pug,handlebars) style hai baad mai html mai convert hogi
    //ejs => html ke pass super power nhi hai calculation karne ki 
    //HTML 1+2 and EJS 1+2 =3
    //ejs is html with superpowers js inside html
    //ye ek style of markup se convert karke apke html dete hai
    //ejs convert in html 

//so many template engine pug,handlebars,ejs,jade    
//ejs very very similar to html
//.render () bolta hai pheli cheez vo dedo jo views mai se dikhana ho second cheez mai data bhej sakte ho


// static files
    //img,stylesheet,frontJs setup
    //stpe 1) create folder public
    //industry standard
    //create 3 folder inside it images,stylesheet,javascript
    //configure the express static script.js file
    //understood the path

// http methods get post

// error handling

