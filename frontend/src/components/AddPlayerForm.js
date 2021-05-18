import React from 'react'
import { useState } from 'react'

const AddPlayerForm = ({ addPlayer }) => {
  const [newName, setNewName] = useState('New name...')
  const [newSurname, setNewSurname] = useState('New surname...')

  const handleSubmit = (event) => {
    event.preventDefault()
    addPlayer([newName, newSurname])
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