// import React, { useState, useEffect } from 'react'
import React, { useState } from 'react'
import PlayerSelection from './PlayerSelection'
import tournamentService from '../services/tournament'
// import matchService from '../services/match'
// import seedService from '../services/seed'

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

  // const [seeds, setSeeds] = useState([])

  // useEffect(() => {
  //   console.log(selectedPlayers)
  // }, [selectedPlayers])

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
        // console.log(returnedTournament)
        // createSeeds(returnedTournament)
        createMatches(returnedTournament)
      })
    setNewName('')
  }

  const createMatches = (tournament) => {
    // console.log('Luodaan ottelut turnaukselle')
    console.log('ottelut', tournament)

    // Empty matches
    // const matchNumbers =[[1, 2, 3, 4], [5, 6], [7]]
    // const winnerTo = [[5, 5, 6, 6], [7, 7]]
    const participants = [...tournament.participant]
    const template = participants > 8 ? [1,16,9,8,5,12,13,4,3,14,11,6,7,10,15,2] : [1,8,5,4,3,6,7,2]
    const bracket = template.map(seed => participants[seed-1] ? participants[seed-1] : 'wo')
    console.log('bracket', bracket)
    // while (bracket.length) {
    //   const pairing = participants.splice(-2, 2)
    //   console.log('pairing', pairing)
    //   // const matchObj = {
    //   //   tournament: tournament.id,
    //   //   player1: pairings[0],
    //   //   player2: pairings[1]
    //   // }
    // }
    // console.log(seeds)

    // const draw8Players = []

    // draw8Template.forEach((seed, i) => {
    //   draw8Players[i] = seeds.find(seeds => seeds.seed === seed)
    // })

    // console.log(draw8Players)

    // const matchArr = []
    // const numOfPlayers = tournament.participant.length
    // let i = 0
    // for (i = 0; i < numOfPlayers; i=i+2){
    //   if(i<= numOfPlayers -2){
    //     const matchObj = {
    //       tournament: tournament.id,
    //       // player1: tournament.participant[i],
    //       // player2: tournament.participant[i+1],
    //       player1: draw8Players[i].participant,
    //       player2: draw8Players[i+1].participant,
    //       number: draw8Structure[0][i],
    //       winnerToNumber: draw8Advancement[0][i],
    //     }
    //     console.log(matchObj)
    //     matchArr.push(matchObj)
    //   }
    //   else  {
    //     const matchObj = {
    //       tournament: tournament.id,
    //       player1: tournament.participant[i],
    //       player2: numOfPlayers%2 === 0 ? tournament.participant[i+1] : tournament.participant[i],
    //     }
    //     matchArr.push(matchObj)
    //   }
    // }

    // matchService
    //   .create(matchArr)
    //   .then(returnedMatch => {
    //     console.log(returnedMatch)
    //   })
  }

  // const createSeeds = (tournament) => {
  //   console.log('Luodaan arvonta turnaukselle')
  //   console.log(tournament)

  //   const seedArr = []
  //   const numOfPlayers = tournament.participant.length
  //   let i = 0
  //   for (i = 0; i < numOfPlayers; i++){
  //     const seedObj = {
  //       tournament: tournament.id,
  //       player: tournament.participant[i],
  //     }
  //     seedArr.push(seedObj)
  //   }

  //   seedService
  //     .create(seedArr)
  //     .then(returnedSeeds => {
  //       console.log(returnedSeeds)
  //       // setSeeds(returnedSeeds)
  //       createMatches(tournament, returnedSeeds)
  //     })
  // }

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