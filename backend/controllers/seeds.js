const seedsRouter = require('express').Router()
// const { default: tournament } = require('../../frontend/src/services/tournament')
const Seed = require('../models/seed')

seedsRouter.get('/', async (request, response) => {
  const seeds = await Seed
    .find({})
  response.json(seeds.map(tournament => tournament.toJSON()))
})

seedsRouter.get('/:tournamentId', async (request, response) => {
  const seeds = await Seed
    .find({ tournament: request.params.tournamentId })
  response.json(seeds.map(tournament => tournament.toJSON()))
})

seedsRouter.post('/', (request, response, next) => {
  const body = request.body
  const arr = []
  let i = 0

  const seeds = [1,2,3,4,5,6,7,8]
  shuffle(seeds)

  body.forEach(seed => {
    const modelledSeed =
    new Seed({
      tournament: seed.tournament,
      participant: seed.player,
      seed: seeds[i++],
    })
    console.log(modelledSeed)
    arr.push(modelledSeed)
  })


  Seed
    .insertMany(arr)
    .then(savedSeeds => {
      console.log(savedSeeds)
    })
    .catch(error => next(error))
})

seedsRouter.delete('/', (request, response, next) => {
  Seed
    .deleteMany({})
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const shuffle = (array) => {
  var currentIndex = array.length,  randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}

module.exports = seedsRouter