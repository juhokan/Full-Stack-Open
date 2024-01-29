import { useState } from 'react'

const Person = ({ person }) => (
  <p>{person.name}</p>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const addNumber = (event) => {
    event.preventDefault()
    const personsObject = {
      name: newName
    }
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
      setPersons(persons.concat(personsObject))
      setNewName('') 
    }

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
    </div>
  )

}

export default App