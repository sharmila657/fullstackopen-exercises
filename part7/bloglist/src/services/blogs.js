import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

// let token = JSON.parse(localStorage.getItem("loggedNoteappUser")).token;

const getAll = async (blogs) => {
  const response = await axios.get(baseUrl,blogs)
  return response.data;
}

const create = async (newblogs) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response = await axios.post(baseUrl, newblogs, config)
  return response.data;
}

const update = async (id,blogToUpdate) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blogToUpdate, config);
    return response.data;
  } catch (error) {
    console.error('Error updating blog:', error);
  }
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  try {
    
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response;
  }
  catch (error) {
    console.error('error deleting blog', error)
  }
  
}

export default { getAll, create,update,remove}