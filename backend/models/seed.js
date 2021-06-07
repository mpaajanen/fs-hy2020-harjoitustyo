const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const seedSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tournament'
  },
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  seed: { type: Number }
})

seedSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

seedSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Seed', seedSchema)