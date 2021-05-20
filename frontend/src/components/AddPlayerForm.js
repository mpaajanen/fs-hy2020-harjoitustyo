import React, { useState } from 'react'
import playerService from '../services/player'

const AddPlayerForm = ({ players, onAdd }) => {
  const [newName, setNewName] = useState('New name...')
  const [newSurname, setNewSurname] = useState('New surname...')

  const handleSubmit = (event) => {
    event.preventDefault()
    const playerObject = {
      name: newName,
      surname: newSurname,
      id: players.length + 1,
    }

    playerService
      .create(playerObject)
      .then(returnedPlayer => {
        onAdd(returnedPlayer)
      })

    setNewName('')
    setNewSurname('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSurnameChange = (event) => {
    setNewSurname(event.target.value)
  }

  return (
    <form onSubmit={event => handleSubmit(event)}>
    Name:
      <input
        value={newName}
        onChange={handleNameChange}
      /><br />
    Surname:
      <input
        value={newSurname}
        onChange={handleSurnameChange}
      /><br />
      <button type="submit">Add player</button>
    </form>
  )
}

export default AddPlayerForm