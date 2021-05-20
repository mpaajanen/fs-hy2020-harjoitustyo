import React from 'react'
import Player from './Player'

const ListPlayers = ({ players }) => {
  return (
    <div>
      <h1>Players:</h1>
      <ul>
        {players.map((player) =>
          <Player key={player.id} player={player} />
        )}
      </ul>
    </div>
  )
}

export default ListPlayers