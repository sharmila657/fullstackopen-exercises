
import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((result) => result.data);
};

const create = (note) => {
  return axios.post(baseUrl, note);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((result)=>result.data)
}

const update = (id,updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson).then((result)=>(result.data))
}
export default { create, getAll, remove, update}