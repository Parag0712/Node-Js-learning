// data base store data why 
// we need database
// for store permanent data
// in past we have file system but
// in file system we can't manage data well 
// so database come in picture

// we have 2 type one called relational and second non-relational 
// relational ->we have table
// non-relational -> form of object

//---------------------------------------------------------------------------

    //har naye app ka data store hoga storage mein, par usey directly rakhne ki jagah container mein rakhegem,us container mein sirf us app ka data ayega  is called  uss app ka database
    //databasename = app

//----------------------------------------------------------------------------------------
// --------------------------------What is Model (collection)-----------------------------
//----------------------------------------------------------------------------------------

    //Now we talk inside app database
    //Now app have different type of data like app__user, app__products, app__salary...
    //variety of data make using model user model ,products model
    //model banate hai code mai aur jo banta hai database mai usko bolte hai colletion

    //code write for model and database make collection
    //Model(code) => collection(db) in db

//----------------------------------------------------------------------------------------
// --------------------------------Schemas(documents)-------------------------------------
//----------------------------------------------------------------------------------------

    //Now We talk inside Model for example user.collection(also Call Model) &&  have so many documents
    //code mai hame schema banate hai aur db mai documents banata hai
    //schema(code)=>documents(db)
    //user model/collection have data name,password,number,email
    //ek app(db) mein variety of data(Collection) hota hai pura data hai hota app ka hi
    //db have so many collection have document
    //collection matlab users(so many users) ka data 
    //document matlab user(one user details) ka data  


// --------------------------------Diagram-----------------------------------

//(Code Side)            vs            (DB Side) 
// Db Setup              ->           DB Formation    
// Model                 ->           collection
// Schemas               ->           Documents

