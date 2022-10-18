import React from 'react'
import tournamentService from '../services/tournament'
import matchService from '../services/match'
import seedService from '../services/seed'

const Menu = ({ onSelection }) => {
  return (
    <div>
      <button onClick={() => onSelection('players') }>Pelaajat</button>
      <button onClick={() => onSelection('tournaments')}>Listaa turnaukset</button>
      <button onClick={() => onSelection('tournament')}>Luo turnaus</button>
      <button onClick={() => onSelection('matches')}>Ottelut</button>
      <button onClick={() => onSelection('draw')}>Kaavio</button>
      <button onClick={() => tournamentService.delAll()}>Nollaa turnaukset</button>
      <button onClick={() => matchService.delAll()}>Nollaa ottelut</button>
      <button onClick={() => seedService.delAll()}>Nollaa arvonta</button>

    </div>
  )
}

export default Menu