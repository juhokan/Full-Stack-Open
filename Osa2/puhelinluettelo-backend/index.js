const express = require('express')
const morgan = require('morgan');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const password = process.env.PASSWORD;

const url = `mongodb+srv://juhokan:${password}@puhelinluettelo-db.mutnh94.mongodb.net/personsApp?retryWrites=true&w=majority&appName=puhelinluettelo-db`;

app.use(cors())
app.use(express.static('dist'))

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema)

app.use(express.json());

morgan.token('data', (req) => {
   if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '';
});

app.use(morgan(':method :url :status :response-time ms :data'));

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const dateHeader = request.headers['date'];
    const currentDate = dateHeader ? new Date(dateHeader) : new Date();
    const dateTime = currentDate.toLocaleString('en-EU', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    });
    const info = `
        <p>phonebook has info for ${persons.length} people</p>
        <p>${dateTime}</p>
    `;
    response.send(`<div>${info}</div>`);
});


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
       })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id)
    .then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'content missing' });
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number
    });

    newPerson.save()
        .then(savedPerson => {
            response.json(savedPerson);
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})