import axios from 'axios'
const url = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
    return axios.get(`${url}/api/all`)
}

const getCountry = (country) => {
    return axios.get(`${url}/api/${country}`)
}

export default {
    getAll: getAll,
    getCountry: getCountry
}