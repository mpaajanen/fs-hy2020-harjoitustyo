const matchesRouter = require('express').Router()
const Match = require('../models/match')
const jwt = require('jsonwebtoken')

matchesRouter.get('/', async (request, response) => {
  const matches = await Match
    .find({})
    .populate('tournament', { name: 1 })
    .populate('player1')
    .populate('player2')
  response.json(matches.map(match => match.toJSON()))
})

// matchesRouter.get('/:id', (request, response, next) => {
//   Match
//     .findById(request.params.id)
//     .then(match => {
//       if(match) {
//         response.json(match)
//       }
//       else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

matchesRouter.get('/:tournamentId', async (request, response) => {
  const matches = await Match
    .find({ tournament: request.params.tournamentId })
    .populate('tournament', { name: 1 })
    .populate('player1')
    .populate('player2')
  response.json(matches.map(tournament => tournament.toJSON()))
})


matchesRouter.delete('/:id', (request, response, next) => {
  Match
    .findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

matchesRouter.delete('/', (request, response, next) => {
  Match
    .deleteMany({})
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

matchesRouter.put('/:id', (request, response, next) => {
  const body = request.body
  console.log(body)

  const match = { body }

  Match
    .findByIdAndUpdate(request.params.id, match, { new: true })
    .populate('participant')
    .then(updatedMatch => {
      response.json(updatedMatch)
    })
    .catch(error => next(error))
})

matchesRouter.post('/', (request, response, next) => {
  const body = request.body
  // console.log(body)

  //TODO: kelvoillisuuden tarkistukset
  // if (!body.name) {
  //   return response.status(400).json({
  //     error: 'name missing'
  //   })
  // }

  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const arr = []
  body.forEach(match => {
    const modelledMatch =
    new Match({
      tournament: match.tournament,
      player1: match.player1,
      player2: match.player2,
      points1: match.points1,
      points2: match.points2,
    })
    arr.push(modelledMatch)
  })

  // console.log(arr)

  // const match1 = new Match ({
  //   tournament: body.tournament,
  //   player1: body.player1,
  //   player2: body.player2,
  //   points1: body.points1,
  //   points2: body.points2,
  // })
  // const match2 = new Match ({
  //   tournament: body.tournament,
  //   player1: body.player1,
  //   player2: body.player2,
  //   points1: body.points1,
  //   points2: body.points2,
  // })
  // const matchArr = [match1, match2]
  // console.log(matchArr)

  Match
    .insertMany(arr)
    // .then(savedMatches => savedMatches.toJSON())
    .then(savedAndFormatedMatches => {
      response.json(savedAndFormatedMatches)
      // console.log(savedAndFormatedMatches)
    })
    .catch(error => next(error))

  // match
  //   .save()
  //   .then(savedMatch => savedMatch.toJSON())
  //   .then(savedAndFormatedMatch => {
  //     response.json(savedAndFormatedMatch)
  //   })
  //   .catch(error => next(error))
})

module.exports = matchesRouter