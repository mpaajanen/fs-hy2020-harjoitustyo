import React from 'react'
import tournamentService from '../services/tournament'
import matchService from '../services/match'

const Menu = ({ onSelection }) => {
  return (
    <div>
      <button onClick={() => onSelection('players') }>Pelaajat</button>
      <button onClick={() => onSelection('tournament')}>Turnaus</button>
      <button onClick={() => onSelection('matches')}>Ottelut</button>
      <button onClick={() => tournamentService.delAll()}>Nollaa turnaukset</button>
      <button onClick={() => matchService.delAll()}>Nollaa ottelut</button>

    </div>
  )
}

export default Menu