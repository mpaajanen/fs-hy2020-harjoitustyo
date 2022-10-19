import React, { useState } from 'react'
import PlayerSelection from './PlayerSelection'
import tournamentService from '../services/tournament'
import matchService from '../services/match'

const CreateTournament = ( players ) => {
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [newName, setNewName] = useState('')

  const shuffle = (array) => {
    var currentIndex = array.length,  randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]]
    }

    return array
  }

  const handleCreateTournament = (event) => {
    event.preventDefault()
    console.log('Luodaan uusi turnaus: ' + newName)
    if(selectedPlayers > 16){
      console.log('Pelaajia voi olla enintään 16')
      return null
    }

    const participantIds = selectedPlayers.map(player => player.id)
    const shuffledParticipants = shuffle(participantIds)
    const tournamentObject = {
      name: newName,
      participant: shuffledParticipants
    }

    tournamentService
      .create(tournamentObject)
      .then(returnedTournament => {
        createMatches(returnedTournament)
      })
    setNewName('')
  }

  const createMatches = (tournament) => {
    console.log('tournament', tournament)

    const participants = [...tournament.participant]
    const matchNumbers = participants.length > 8 ? [8, 7, 6, 5, 4, 3, 2, 1] : [4, 3, 2, 1]
    const winnerTo = participants.length > 8 ? [12, 12, 11, 11, 10, 10, 9, 9] : [6, 6, 5, 5]
    const template = participants.length > 8 ? [1,16,9,8,5,12,13,4,3,14,11,6,7,10,15,2] : [1,8,5,4,3,6,7,2]
    const bracket = template.map(seed => participants[seed-1] ? participants[seed-1] : 'wo')

    const matchArr = []
    while (bracket.length) {
      const pairing = bracket.splice(0, 2)
      const matchObj = {
        tournament: tournament.id,
        player1: pairing[0] === 'wo' ? null : pairing[0],
        player2: pairing[1] === 'wo' ? null : pairing[1],
        number: matchNumbers.pop(),
        winnerToNumber: winnerTo.pop(),
        wo1: pairing[0] === 'wo',
        wo2: pairing[1] === 'wo',
      }
      matchArr.push(matchObj)
    }
    console.log('matchArr', matchArr)

    matchService
      .create(matchArr)
      .then(returnedMatch => {
        console.log(returnedMatch)
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