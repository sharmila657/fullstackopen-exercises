import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = () => {
  const userToken = JSON.parse(window.localStorage.getItem("user"))
  token = `Bearer ${userToken.token}`
  return token
}

const getAll = async (blogs) => {
  const response = await axios.get(baseUrl,blogs)
  return response.data;
}

const create = async (newblogs) => {
  const myToken=setToken()
  const config = {
    headers: { Authorization: myToken },
  }
  const response = await axios.post(baseUrl, newblogs, config)
  return response.data;
}

const update = async (id,blogToUpdate) => {
  const myToken = setToken()
  const config = {
    headers: { Authorization: myToken },
  }
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blogToUpdate, config);
    return response.data;
  } catch (error) {
    console.error('Error updating blog:', error);
  }
};

const remove = async (id) => {
  const myToken = setToken()
  const config = {
    headers: { Authorization: myToken },
  }
  try {
    
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response;
  }
  catch (error) {
    console.error('error deleting blog', error)
  }
  
}

export default { getAll, create, setToken,update,remove}