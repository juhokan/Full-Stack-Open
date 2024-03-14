/* eslint-disable react/prop-types */
import { useState } from 'react'

const Person = ({ person }) => (
  <p>{person.name} {person.number}</p>
);

const PersonsMap = ({ persons, filter }) => (
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

const Filter = ({ filter, handleFilter }) => (
  <form>
    <div>
      filter shown with<input value={filter} onChange={handleFilter} />
    </div>
  </form>
);

const AddInformation = ({ addNumber, newName, handleNameChange, newNumber, handleNumberChange }) => (
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
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');


  const addNumber = (event) => {
    event.preventDefault()
    const personsObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
      setPersons(persons.concat(personsObject))
      setNewName('') 
    }

  }

  const handleFilter = (event) => {
    const value = event.target.value;
    console.log(value)
    setFilter(value);
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

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
        handleNumberChange={handleNumberChange} />
        
      <h2>Numbers</h2>
      <PersonsMap persons={persons} filter={filter}/>
    </div>
  )

}

export default App