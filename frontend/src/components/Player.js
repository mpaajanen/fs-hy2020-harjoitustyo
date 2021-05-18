import React from 'react'

const Player = ({ player }) => {
  return (
    <li>{player.name} {player.surname} {player.id}</li>
  )
}

export default Player