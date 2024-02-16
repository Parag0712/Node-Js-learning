const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('This is Main Page.')
})

app.get('/Home/:username&:password',(req,res)=>{
    const username = req.params.username;
    const password = req.params.password;
    res.send( `Hello I am ${username +"  "+  password}`)
})

app.listen(port, () => {
    console.log(`http://localhost:3000/`)
})

