import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import DoneIcon from '@material-ui/icons/Done'
import DeleteIcon from '@material-ui/icons/Delete'
import matchService from '../services/match'


const ResultForm = ({ match }) => {
  const frameObj = { p1: '', p2: '' }
  const [frameScores, setFrameScores] = useState([frameObj])

  const mergeScores = (match) => {
    console.log('match', match)
    const scores = match.points1.map((points, index) => {
      return { p1: points, p2: match.points2[index] }
    })
    return scores
  }

  useEffect(() => {
    const scores = match.points1.length > 0 ? mergeScores(match) : frameScores
    setFrameScores(scores)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedMatch = {
      tournament: match.tournament.id,
      player1: match.player1 ? match.player1.id : null,
      player2: match.player2 ? match.player2.id : null,
      points1: frameScores.map(scores => scores.p1),
      points2: frameScores.map(scores => scores.p2),
    }
    matchService
      .update(match.id, updatedMatch)
      .then(returnedMatch => {
        console.log('returnedMatch', returnedMatch)
      })
    console.log('tulos lähetetty', frameScores)
  }

  const handleChange = (index, event) => {
    const newPointFields = frameScores.map((i, ind) => {
      if(ind === index) {
        i[event.target.name] = event.target.value
      }
      return i
    })

    setFrameScores(newPointFields)
  }

  const handleAddFields = () => {
    setFrameScores([...frameScores, frameObj])
  }

  const handleRemoveFields = index => {
    const values  = [...frameScores]
    values.splice(index, 1)
    setFrameScores(values)
  }

  return (
    <form onSubmit={event => handleSubmit(event)}>
      {frameScores.map((pointField, index) => (
        <div key={index} >
          <TextField
            name="p1"
            label="p1"
            variant="filled"
            value={pointField.p1}
            onChange={event => handleChange(index, event)}
          />
          <TextField
            name="p2"
            label="p2"
            variant="filled"
            value={pointField.p2}
            onChange={event => handleChange(index, event)}
          />

          <IconButton onClick={handleAddFields}          >
            <DoneIcon />
          </IconButton>
          <IconButton disabled={frameScores.length === 1} onClick={() => handleRemoveFields(index)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <button type="submit">Tallenna</button>
    </form>
  )
}

export default ResultForm