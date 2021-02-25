/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
// const _ = require('lodash')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    // .populate('blogs', {
    //   url: 1,
    //   title: 1,
    //   author: 1,
    //   id: 1
    // })
  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.username.length < 3) {
    return response.status(400).json({ error: 'username less than 3 characters' })
  }

  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password less than 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user
    .save()
    .catch(error => {
      response.status(400).json({ error: 'username is already taken' })
    })

  response.json(savedUser)
})

module.exports = usersRouter