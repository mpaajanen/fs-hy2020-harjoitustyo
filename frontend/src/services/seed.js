import axios from 'axios'
const baseUrl = '/api/seeds'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getByTournamnetId = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const delAll = () => {
  const request = axios.delete(`${baseUrl}/`)
  return request.then(response => response.data)
}

export default { getAll, getByTournamnetId, create, delAll }