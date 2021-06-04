/* eslint-disable no-undef */
const tournamentsRouter = require('express').Router()
const Tournament = require('../models/tournament')
const jwt = require('jsonwebtoken')
// const { response } = require('express')
// const mongoose = require('mongoose')

tournamentsRouter.get('/', async (request, response) => {
  const tournaments = await Tournament
    .find({})
    .populate('participant')
  response.json(tournaments.map(tournament => tournament.toJSON()))
})

tournamentsRouter.get('/:id', (request, response, next) => {
  Tournament
    .findById(request.params.id)
    .then(tournament => {
      if(tournament) {
        response.json(tournament)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

tournamentsRouter.delete('/:id', (request, response, next) => {
  Tournament
    .findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

tournamentsRouter.delete('/', (request, response, next) => {
  Tournament
    .deleteMany({})
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

tournamentsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  console.log(body.participant)
  if(body.participant.length > 1){
    const ids = body.participant.map(p => p.id)
    console.log(ids)
  }
  else ids = body.participant.id

  const tournament = {
    name: body.name,
    participant: ids
  }

  Tournament
    .findByIdAndUpdate(request.params.id, tournament, { new: true })
    .populate('participant')
    .then(updatedTournament => {
      response.json(updatedTournament)
    })
    .catch(error => next(error))

  // Tournament
  //   .findByIdAndUpdate(request.params.id, { $push: { participant: ['60a63de9d391392decab1f06'] } }, { new: true })
  //   .populate('participant')
  //   .then(updatedTournament => {
  //     response.json(updatedTournament)
  //   })
  //   .catch(error => next(error))
})

tournamentsRouter.put('/add/:id', (request, response, next) => {
// tournamentsRouter.put('/add/:id', (request, response) => {
  const body = request.body
  const uupe = request.body.testi
  console.log(body)
  console.log(uupe)
  Tournament
    .findByIdAndUpdate(request.params.id, { $push: { participant: [uupe] } }, { new: true })
    .populate('participant')
    .then(updatedTournament => {
      response.json(updatedTournament)
    })
    .catch(error => next(error))
  // return response.send('add')
//   try {
//     const body = request.body
//     console.log(body)
//   } catch (e) {
//     e => next(e)
//   }
//   // return response.status(200)
})

// tournamentsRouter.post('/', async (request, response, next) => {
tournamentsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const tournament = new Tournament ({
    name: body.name,
    participant: body.participant
  })

  tournament
    .save()
    .then(savedTournament => savedTournament.toJSON())
    .then(savedAndFormatedTournament => {
      response.json(savedAndFormatedTournament)
    })
    .catch(error => next(error))
})

module.exports = tournamentsRouter