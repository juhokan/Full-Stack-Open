/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import CountryService from '/services/CountryService.js'


const Filter = ({ filter, handleFilter }) => {
  return (
    <form>
      <div>
        find countries<input value={filter} onChange={handleFilter} />
      </div>
    </form>
  )
}

const ShowInfoButton = ({country, setFilter}) => {
  const handleInfo = () => {
    setFilter(country.name.common)
  }
  return (
    <button onClick={handleInfo}>show</button>
  )
}

const CountryList = ({ setFilter, country }) => (

  <p>
    {country.name.common}

    <ShowInfoButton setFilter={setFilter} country={country} />

  </p>
)

const CountryInfo = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
  <p>capital {country.capital}</p>
  <p>area {country.area}</p>
  <h3>languages:</h3>
  <ul>
      {Object.entries(country.languages).map(([code, name]) => (
        <li key={code}>
          - {name}
        </li>
      ))}
    </ul>
    <img src={country.flags.png} alt="flag" />
  </div>
)

const CountryMap = ({ filter, setFilter, countries }) => {
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (filter === '') {
    return <p>Too many matches, specify another filter</p>;

  } else if (filteredCountries.length === 1) {
    return <CountryInfo country={filteredCountries[0]} />;

  } else if (filteredCountries.length <= 10) {
    return filteredCountries.map(country => (
      <div key={country.name.common}>
        <CountryList country={country} setFilter={setFilter} />
      </div>
    ));
    

  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};


function App() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([])

  useEffect(() => {
    CountryService.getAll()
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
      });
  }, [filter]);

  const handleFilter = (event) => {
    const value = event.target.value;
    setFilter(value);
  };

  return (
    <>
      <Filter filter={filter} handleFilter={handleFilter} />
      <CountryMap filter={filter} setFilter={setFilter} countries={countries} />
    </>
  );
  
  
}

export default App

