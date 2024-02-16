import express from 'express'
const app = express()
import giveMeAJoke from 'give-me-a-joke';

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    giveMeAJoke.getRandomDadJoke((joke) => {
        res.locals.randomJoke = joke;
        next();
    });
});

app.get('/', (req, res) => {
    res.send("Server is Ready")
})

app.get('/api/jokes', (req, res) => {
    res.json({ joke: res.locals.randomJoke });
});

//get a list a jokes
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})