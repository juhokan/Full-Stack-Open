import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(url)
}

const create = newObject => {
    return axios.post(url, newObject)
  }
  

const update = (id, newObject) => {
    return axios.put(`${url}/${id}`, newObject)
}

const deleteVal = (id) => {
    return axios.delete(`${url}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    deleteVal: deleteVal
}