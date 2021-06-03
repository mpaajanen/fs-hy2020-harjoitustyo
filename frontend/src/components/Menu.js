import React from 'react'

const Menu = ({ onSelection }) => {
  return (
    <div>
      <button onClick={() => onSelection('players') }>Pelaajat</button>
      <button onClick={() => onSelection('tournament')}>Turnaus</button>
      <button onClick={() => onSelection('matches')}>Ottelut</button>

    </div>
  )
}

export default Menu