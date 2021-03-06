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
    if (req.query.person !== undefined) {
        const quotesByPerson = quotes.filter(quote => quote.person === req.query.person);
        res.send({
            quotes: quotesByPerson
        });
    } else {
        res.send({
            quotes: quotes
        });
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

app.put('/api/quotes', (req, res) => {
    if (req.query.id !== undefined) {
        let index;
        for (let quote in quotes) {
            if (quote.id === req.query.id) {
                index = quote.id;
                break;
            }
        }
        console.log(index);
        if (req.query.quote !== undefined) {
            quotes[index].quote = req.query.quote;
        }
        if (req.query.person !== undefined) {
            quotes[index].person = req.query.person;
        }
        res.status(204).send(quotes[index]);
    } else {
        res.status(404).send();
    }
})

app.delete('/api/quotes', (req, res) => {
    const id = req.query.id;
    if (id) {
        const idObject = quotes.findIndex(quote => quote.id === id);
        delete quotes[idObject - 1];
        res.status(203).send(quotes);
    } else {
        res.send(quotes);
    }
})

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
})