import React, { useState, useEffect } from 'react'
import PlayerSelection from './PlayerSelection'
import tournamentService from '../services/tournament'
import matchService from '../services/match'

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
        createMatches(returnedTournament)
      })
    setNewName('')
  }

  const createMatches = (tournament) => {
    console.log('Luodaan ottelut turnaukselle')
    console.log(tournament)

    const matchArr = []
    let i = 0
    for (i = 0; i < 3; i=i+2){
      const matchObj = {
        tournament: tournament.id,
        player1: tournament.participant[i],
        player2: tournament.participant[i+1],
      }
      matchArr.push(matchObj)
    }

    console.log(matchArr)

    matchService
      .create(matchArr)
      .then(returnedMatch => {
        console.log(returnedMatch)
      })

    // const matchObject = {
    //   tournament: tournament.id,
    //   player1: tournament.participant[0],
    //   player2: tournament.participant[1],
    // }

    // matchService
    //   .create(matchObject)
    //   .then(returnedMatch => {
    //     console.log(returnedMatch)
    //   })
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