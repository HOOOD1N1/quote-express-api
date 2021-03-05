const { query } = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.get('/api/quotes/random', (req, res) => {
    const quote = getRandomElement(quotes);
    console.log(quote);
    res.send({
        quote
    });

})

app.get('/api/quotes', (req, res) => {
    if (!req.query) {
        res.status(200).send(quotes);
    } else {
        if (req.query.person) {
            const quotesString = [];
            for (let quote in quotes) {
                if (quote[person] === req.query.person) {
                    quotesString.push(quote);
                }
            }
            console.log({ quotes: quotesString })
            res.send({ quotes: quotesString });
        }
    }
})

app.post('/api/quotes', (req, res) => {
    if (req.query.person && req.query.quote) {
        quotes.push({ quote: req.query.quote, person: req.query.person, });
        res.status(200).send({ quote: quotes });
    } else {
        res.status(400).send();
    }
})

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
})