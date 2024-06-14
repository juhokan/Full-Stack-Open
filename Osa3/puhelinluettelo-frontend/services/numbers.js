import axios from 'axios';

const url = '/api/persons';

const getAll = () => axios.get(url);

const create = (newObject) => axios.post(url, newObject);

const update = (id, newObject) => axios.put(`${url}/${id}`, newObject);

const deleteVal = (id) => axios.delete(`${url}/${id}`);

export default {
  getAll,
  create,
  update,
  deleteVal,
};
