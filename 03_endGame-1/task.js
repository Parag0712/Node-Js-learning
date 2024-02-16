const express = require('express')
const app = express()
const port = 3000

// ejs setup
app.set("view engine", "ejs")

// static file setup
app.use(express.static("./public"))

app.get('/:name?/', (req, res) => {
    if (req.params.name === 'error') {
        // Pass the error message as a parameter to the 'index' route
        throw Error("Something")
    }
    res.render("index", { name: req.params.name })
})

app.get("/error", function (req, res, next) {
    throw Error("Something")
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