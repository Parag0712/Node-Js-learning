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