const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  participant: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
})

tournamentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

tournamentSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Tournament', tournamentSchema)