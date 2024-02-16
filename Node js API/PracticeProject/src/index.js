import dotenv from 'dotenv'
import app from 'express'
dotenv.config({
    path:"./.env"
});

app.get('/',(res,req)=>{
    res.send("HELLO PARAG ")
})