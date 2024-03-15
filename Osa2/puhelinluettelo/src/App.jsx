/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import numberService from '/./services/numbers.js'
import '/./index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Person = ({ person, setPersons, setErrorMessage }) => (
  <p>
    {person.name}
    {person.number}
    <DeleteButton person={person} setPersons={setPersons} setErrorMessage={setErrorMessage} />
  </p>
);

const DeleteButton = ({ person, setPersons, setErrorMessage }) => {
  const handleDelete = () => {
    numberService.deleteVal(person.id)
      .then(() => {
        return numberService.getAll();
      })
      .then(response => {
        setPersons(response.data);
        setErrorMessage(
          `Person '${person.name}' was deleted`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      })
      .catch(error => {
        console.error('Error deleting person:', error);
        setErrorMessage(
          `Error deleting person '${person.name}'`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
  };

  return (
    <button onClick={handleDelete}>
      delete
    </button>
  );
};

const Filter = ({ filter, handleFilter }) => {
  return (
    <form>
      <div>
        filter shown with<input value={filter} onChange={handleFilter} />
      </div>
    </form>
  )
}

const AddInformation = ({ addNumber, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addNumber}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    numberService.getAll()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
      });
  }, []);

  const addNumber = (event) => {
    event.preventDefault();
    const personsObject = {
      name: newName,
      number: newNumber
    };
  
    const existingPerson = persons.find(person => person.name === newName);
    
    if (existingPerson) {
      numberService.update(existingPerson.id, personsObject)
        .then(response => {
          setPersons(persons.map(person => person.id === existingPerson.id ? response.data : person));
        })
        .then(() => {
          setErrorMessage(
            `Persons '${newName}' number was updated`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        });
    } else {
      numberService.create(personsObject)
        .then(response => {
          setPersons(persons.concat(response.data));
        }).then(() => {
          setErrorMessage(
            `Persons '${newName}' number was added`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        });
    }
    setNewName('');
    setNewNumber('');
  };

  const handleFilter = (event) => {
    const value = event.target.value;
    setFilter(value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter filter={filter} handleFilter={handleFilter} />
  
      <h2>Add a New</h2>
      <AddInformation
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
        
      <h2>Numbers</h2>
      {filter === '' ? (
        persons.map(person => (
          <Person key={person.name} person={person} setPersons={setPersons} setErrorMessage={setErrorMessage} />
        ))
      ) : (
        persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => (
          <Person key={person.name} person={person} setPersons={setPersons} setErrorMessage={setErrorMessage} />
        ))
      )}
    </div>
  );
};

export default App;