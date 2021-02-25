/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const playersRouter = require('express').Router()
const Player = require('../models/player')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
// const { usersInDb } = require('../utils/blog_helper')

playersRouter.get('/', async (request, response) => {
  const players = await Player.find({})
  response.json(players.map(player => player.toJSON()))
})

// playersRouter.get('/api/players', (request, response) => {
//   Player.find({}).then(players => {
//     response.json(players)
//   })
// })

playersRouter.get('/:id', (request, response, next) => {
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

playersRouter.delete('/:id', (request, response, next) => {
  Player
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

playersRouter.put('/:id', (request, response, next) => {
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

// const generateId = () => {
//   const maxId = players.length > 0
//     ? Math.max(...players.map(n => n.id))
//     : 0
//   return maxId + 1
// }

playersRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.surname) {
    return response.status(400).json({
      error: 'name, surname or both missing'
    })
  }

  const player = new Player ({
    // id: generateId(),
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

module.exports = playersRouter
