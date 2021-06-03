const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const playersRouter = require('./controllers/players')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tournamentsRouter = require('./controllers/tournaments')
const matchesRouter = require('./controllers/matches')
const mongoose = require('mongoose')

console.log('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/players', playersRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/tournaments', tournamentsRouter)
app.use('/api/tournaments/add', tournamentsRouter)
app.use('/api/matches', matchesRouter)

module.exports = app
