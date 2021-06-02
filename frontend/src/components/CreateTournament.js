import React, { useState, useEffect } from 'react'
import PlayerSelection from './PlayerSelection'
import tournamentService from '../services/tournament'

const CreateTournament = ( players ) => {
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [newName, setNewName] = useState('')

  useEffect(() => {
    console.log(selectedPlayers)
  }, [selectedPlayers])

  const handleCreateTournament = (event) => {
    event.preventDefault()
    console.log('Luodaan uusi turnaus: ' + newName)

    const participantIds = selectedPlayers.map(player => player.id)
    const tournamentObject = {
      name: newName,
      participant: participantIds
    }

    tournamentService
      .create(tournamentObject)
      .then(returnedTournament => {
        console.log(returnedTournament)
      })
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <PlayerSelection players={players} onPlayerSelected={selected => setSelectedPlayers(selected)} />
      <form onSubmit={event => handleCreateTournament(event)}>
        <span>Turnauksen nimi: </span>
        <input
          value={newName}
          onChange={handleNameChange}
        /><br />
        <button type="submit">Luo turnaus</button>
      </form>
    </div>
  )
}

export default CreateTournament