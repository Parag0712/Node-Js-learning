## how to create Express genrator app

```
npm install -g express-generator
express app_name --view=ejs
```

## Mongo Db

```
    npm install mongoose
    const mongoose = require('mongoose');

    <!-- database create (test name) -->
    mongoose.connect("mongodb://127.0.0.1:27017/test")

    <!-- schema create -->
    const userSchema = mongoose.Schema({
        username: String,
        name: String,
        age: Number
    })

    <!-- model crete -->
    userModel = mongoose.model("user", userSchema)


    <!-- Model Export -->
    module.exports={userModel}
```

## how to use in express router

```

    <!-- import Model -->
    const { addressModel, userModel } = require("./users")

    router.get('/create',async function(req, res, next) {
    
        <!-- for insert -->    
        const createUser = await userModel.create({
        username:"parag24",
        age: 1,
        name: "parag"
        })

        res.send(createUser)
    });


    <!-- for reading -->

    router.get('/reading',async function(req,res){
        let allUser = await userModel.find()
        
        res.send(allUser)
    })

    <!-- find one -->

    router.get('/find1',async function(req,res){
        let allUser = await userModel findOne({$or: [{username:"parag24"},
        {age:12}] })

        res.send(allUser)
    })


<!-- for delete -->

router.get('/delete',async function(req,res){
  let deleteData = await userModel.findOneAndDelete({
    username:"parag24"
  })

  res.send(deleteData)
})
```

## Create Session
### session stored in server that's why we use req.session

```
npm i express-session
```

## app.js 

```
var session = require("express-session")

app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"HolaHolaBola"
}))

```

- ``resave``:- agar session ki value change na huyi ho to session ki value resave matt karna

- ``saveUninitialized``:- uninitialize value not save

- ``secret``:- secret key using this key encrypt

### now you create session your router files

```
router.get('/', function (req, res, next) {
    req.session.username = "parag";
    res.render('index', { title: 'Express' });
});
```

### check session

```
router.get("/checkUsername", function (req, res) {
    console.log(req.session);
    if (req.session.username == "parag") {
        res.send("Login")
    } else {
        res.send("username wrong")
    }
  
    <!-- output -->
    Session 
    {
        cookie: 
        { 
            path: '/', 
            _expires: null 
            originalMaxAge: null, 
            httpOnly: true 
        },
        username: 'parag'
    }
})


```

### remove session

```

router.get("/removeSession", function (req, res) {
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
```

## create cookie
```
npm i cookie-parser
```

## app.js

```
var cookieParser = require('cookie-parser');
app.use(cookieParser());
```


### now you create cookie your router files
#### cookie in client side so we send res from server for set and req from server for get
```
router.get("/createCookie",function(req,res){
    res.cookie("color","red")
    res.render("index")
})

```

### check cookie

```
router.get("/readCookie",function(req,res){
    if(req.cookies.color){
        res.send(req.cookies.color)
    }else{
        res.send("Cookie not Set")
    }
})
```

### remove cookie

```
router.get("/deleteCookie",function(req,res){
    if(req.cookies.color){
        res.clearCookie("color")
    }else{
        res.send("not set")
    }
```



