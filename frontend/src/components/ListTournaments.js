import React from 'react'
import { useState, useEffect } from 'react'
// import Player from './Player'
// import playerService from '../services/player'
import tournamentService from '../services/tournament'

const ListTournaments = () => {
  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    tournamentService
      .getAll()
      .then(initialTournaments => {
        setTournaments(initialTournaments)
      })
  }, [])

  const Tournament = ({ tournament, onDelete }) => {
    const handleRemove = () => {
      console.log('poista' + tournament.id)
      onDelete(tournament.id)
    }
    return (
      <li>{tournament.name} <button onClick={handleRemove} >remove</button></li>
    )
  }

  const deleteTournament = (id) => {
    tournamentService
      .del(id)
      .then(() => {
        // onRemove(tournaments.filter(tournament => tournament.id === id ? null : tournament))
        setTournaments(tournaments.filter(tournament => tournament.id === id ? null : tournament))
      })
  }

  return (
    <div>
      <h1>Tournaments:</h1>
      <ul>
        {tournaments.map((tournament) =>
          <Tournament key={tournament.id} tournament={tournament} onDelete={(id) => deleteTournament(id)} />
        )}
      </ul>
    </div>
  )
}

export default ListTournaments