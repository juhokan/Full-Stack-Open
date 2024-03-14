/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import numberService from '/./services/numbers.js'

const Person = ({ person }) => (
  <p>{person.name} {person.number}</p>
);

const PersonsMap = ({ persons, filter }) => {
  return (
    filter === '' ? (
      persons.map(person => (
        <Person key={person.name} person={person} />
      ))
    ) : (
      persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => (
        <Person key={person.name} person={person} />
      ))
    )
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
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      numberService.create(personsObject).then(response => {setPersons(persons.concat(response.data))})
      setNewName('');
      setNewNumber('');
    }
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
      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>add a new</h2>
      <AddInformation
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
        
      <h2>Numbers</h2>
      <PersonsMap persons={persons} filter={filter} />
    </div>
  );
};

export default App;