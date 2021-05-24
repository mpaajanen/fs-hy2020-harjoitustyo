import React from 'react'
import Player from './Player'
import playerService from '../services/player'

const ListPlayers = ({ players, onRemove }) => {

  const deletePlayer = (id) => {
    playerService
      .del(id)
      .then(() => {
        onRemove(players.filter(player => player.id === id ? null : player))
      })
  }

  return (
    <div>
      <h1>Players:</h1>
      <ul>
        {players.map((player) =>
          <Player key={player.id} player={player} onDelete={(id) => deletePlayer(id)} />
        )}
      </ul>
    </div>
  )
}

export default ListPlayers