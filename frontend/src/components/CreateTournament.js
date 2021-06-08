// import React, { useState, useEffect } from 'react'
import React, { useState } from 'react'
import PlayerSelection from './PlayerSelection'
import tournamentService from '../services/tournament'
import matchService from '../services/match'
import seedService from '../services/seed'

const CreateTournament = ( players ) => {
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [newName, setNewName] = useState('')
  // const [seeds, setSeeds] = useState([])

  // useEffect(() => {
  //   console.log(selectedPlayers)
  // }, [selectedPlayers])

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
        // console.log(returnedTournament)
        createSeeds(returnedTournament)
        // createMatches(returnedTournament)
      })
    setNewName('')
  }

  const createMatches = (tournament, seeds) => {
    console.log('Luodaan ottelut turnaukselle')
    console.log(tournament)
    console.log(seeds)

    const draw8Template = [1,8,6,4,3,5,7,2]
    const draw8Players = []

    draw8Template.forEach((seed, i) => {
      draw8Players[i] = seeds.find(seeds => seeds.seed === seed)
    })

    console.log(draw8Players)

    const matchArr = []
    const numOfPlayers = tournament.participant.length
    let i = 0
    for (i = 0; i < numOfPlayers; i=i+2){
      if(i<= numOfPlayers -2){
        const matchObj = {
          tournament: tournament.id,
          // player1: tournament.participant[i],
          // player2: tournament.participant[i+1],
          player1: draw8Players[i].participant,
          player2: draw8Players[i+1].participant,
        }
        console.log(matchObj)
        matchArr.push(matchObj)
      }
      else  {
        const matchObj = {
          tournament: tournament.id,
          player1: tournament.participant[i],
          player2: numOfPlayers%2 === 0 ? tournament.participant[i+1] : tournament.participant[i],
        }
        matchArr.push(matchObj)
      }
    }

    matchService
      .create(matchArr)
      .then(returnedMatch => {
        console.log(returnedMatch)
      })
  }

  const createSeeds = (tournament) => {
    console.log('Luodaan arvonta turnaukselle')
    console.log(tournament)

    const seedArr = []
    const numOfPlayers = tournament.participant.length
    let i = 0
    for (i = 0; i < numOfPlayers; i++){
      const seedObj = {
        tournament: tournament.id,
        player: tournament.participant[i],
      }
      seedArr.push(seedObj)
    }

    seedService
      .create(seedArr)
      .then(returnedSeeds => {
        console.log(returnedSeeds)
        // setSeeds(returnedSeeds)
        createMatches(tournament, returnedSeeds)
      })
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