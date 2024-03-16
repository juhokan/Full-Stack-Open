const express = require('express')
const morgan = require('morgan');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const password = process.env.PASSWORD;

const url = `mongodb+srv://juhokan:${password}@puhelinluettelo-db.mutnh94.mongodb.net/personsApp?retryWrites=true&w=majority&appName=puhelinluettelo-db`;


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        validate: {
            validator: isValidPhoneNumber
        },
        required: true,
    },
});
const Person = mongoose.model('Person', personSchema)


function isValidPhoneNumber(number) {
    return /^\d{2,3}-\d{7,}$/.test(number);
}


morgan.token('data', (req) => {
   if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '';
});

app.use(morgan(':method :url :status :response-time ms :data'));

app.get('/info', (request, response) => {
    Person.find({})
        .then(persons => {
            const count = persons.length;
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
                <p>phonebook has info for ${count} people</p>
                <p>${dateTime}</p>
            `;
            response.send(`<div>${info}</div>`);
        })
        .catch(error => {
            console.error('Error retrieving persons:', error);
            response.status(500).send('Internal Server Error');
        });
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

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    const body = request.body;

    // Check if the number is missing
    if (!body.number) {
        return response.status(400).json({ error: 'Number is missing' });
    }

    // Check if the number is in the correct format
    if (!isValidPhoneNumber(body.number)) {
        return response.status(400).json({ error: 'Invalid phone number format' });
    }

    const updatedPerson = {
        number: body.number
    };

    Person.findByIdAndUpdate(id, updatedPerson, { new: true })
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson);
            } else {
                response.status(404).json({ error: 'Person not found' });
            }
        })
        .catch(error => next(error));
});


const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'Malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    response.status(500).json({ error: 'Internal server error' });
};


app.use(errorHandler);


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})