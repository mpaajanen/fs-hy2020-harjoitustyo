import axios from 'axios'
const baseUrl = '/api/matches'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getByTournamentId = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const addPlayer = (id, playerId) => {
  const request = axios.put(`${baseUrl}/add/${id}`, playerId)
  return request.then(response => response.data)
}

const del = (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const delAll = () => {
  const request = axios.delete(`${baseUrl}/`)
  return request.then(response => response.data)
}

export default { setToken, getAll, getByTournamentId, create, update, addPlayer, del, delAll }