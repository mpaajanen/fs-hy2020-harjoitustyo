const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const matchSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament'
  },
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  player2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  points1: [{ type: Number }],
  points2: [{ type: Number }],
  round: { type: Number },
  number: { type: Number },
  winnerToNumber: { type: Number },
  wo1: { type: Boolean },
  wo2: { type: Boolean },
})

matchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

matchSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Match', matchSchema)