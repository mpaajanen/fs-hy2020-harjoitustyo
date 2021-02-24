/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { request, response } = require('express')
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Player = require('./models/player')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let players = [
  {
    id: 0,
    name: 'Ronnie',
    surname: 'O\'Sullivan',
  },
  {
    id: 1,
    name: 'Jordan',
    surname: 'Brown',
  },
  {
    id: 2,
    name: 'Ding',
    surname: 'Junhui',
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Testing...</h1>')
})

app.get('/api/players', (request, response) => {
  Player.find({}).then(players => {
    response.json(players)
  })
})

app.get('/api/players/:id', (request, response, next) => {
  Player
    .findById(request.params.id)
    .then(player => {
      if(player) {
        response.json(player)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/players/:id', (request, response, next) => {
  Player
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/players/:id', (request, response, next) => {
  const body = request.body

  const player = {
    name: body.name,
    number: body.surname
  }

  Player
    .findByIdAndUpdate(request.params.id, player, { new: true })
    .then(updatedPlayer => {
      response.json(updatedPlayer)
    })
    .catch(error => next(error))
})

const generateId = () => {
  const maxId = players.length > 0
    ? Math.max(...players.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/players/', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.surname) {
    return response.status(400).json({
      error: 'name, surname or both missing'
    })
  }

  const player = new Player ({
    id: generateId(),
    name: body.name,
    surname: body.surname
  })

  player
    .save()
    .then(savedPlayer => savedPlayer.toJSON())
    .then(savedAndFormatedPlayer => {
      response.json(savedAndFormatedPlayer)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.error(error.name)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)