import axios from 'axios'
const baseUrl = '/api/login'

const login = async (user) => {
    let result = await axios.post(baseUrl)
    response.send(result)
}

export default { login }