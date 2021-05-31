import React, { useState } from 'react'
import { useEffect } from 'react'
import tournamentService from '../services/tournament'

const AddTournamentForm = ({ onCreate }) => {
  const [newName, setNewName] = useState('Luo uusi turnaus...')
  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    tournamentService
      .getAll()
      .then(initialTournaments => {
        setTournaments(initialTournaments)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const tournamentObject = {
      name: newName,
      participant: '60a63d8ed391392decab1f05'
    }

    tournamentService
      .create(tournamentObject)
      .then(returnedTournament => {
        onCreate(returnedTournament)
      })
    setNewName('')
  }

  const lisaysTesti = () => {
    const tourid = '60acd82a24cf7a4614e072c7'

    console.log(tournaments.find(tournament => tournament.id === tourid))

    // const temp = {
    //   participant: '60a63de9d391392decab1f06'
    // }

    // tournamentService
    //   .update('60acd82a24cf7a4614e072c7', temp)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <form onSubmit={event => handleSubmit(event)}>
        <input
          value={newName}
          onChange={handleNameChange}
        /><br />
        <button type="submit">Luo turnaus</button>
      </form>
      <form onSubmit={event => lisaysTesti(event)}>
        <button type="submit">Lisaa pelaaja</button>
      </form>
    </div>
  )
}

export default AddTournamentForm