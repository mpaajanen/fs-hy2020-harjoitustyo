import React from 'react'

const Player = ({ player, onDelete }) => {

  const handleRemove = () => {
    console.log('poista' + player.id)
    onDelete(player.id)
  }

  return (
    <li>{player.name} {player.surname} <button onClick={handleRemove} >remove</button></li>
  )
}

export default Player