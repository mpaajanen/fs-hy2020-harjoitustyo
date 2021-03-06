/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
})

playerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

playerSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Player', playerSchema)