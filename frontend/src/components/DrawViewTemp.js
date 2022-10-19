import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import tournamentService from '../services/tournament'
import matchService from '../services/match'
import Matches from './Matches'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const DrawViewTemp = () => {
  const [tournaments, setTournaments] = useState([])
  const [selectedTournament, setSelectedTournament] = useState('')
  const [matches, setMatches] = useState([])

  useEffect(() => {
    tournamentService
      .getAll()
      .then(initialTournaments => {
        setTournaments(initialTournaments)
      })
  }, [])

  useEffect(() => {
    if(selectedTournament){
      matchService
        .getByTournamentId(selectedTournament)
        .then(matches => {
        // console.log(matches)
          setMatches(matches)
        })
    }
  }, [selectedTournament])

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
  )

  const classes = useStyles()

  const handleChange = (event) => {
    setSelectedTournament(event.target.value)
  }

  const handleConfirmBtn = (match) => {
    const result = match.points1.reduce((result, p1, index) => {
      const x = p1 > match.points2[index] ? 1 : -1
      return result + x
    }, 0)
    const winner = result > 0 ? match.player1 : match.player2
    console.log('winner', winner)
    // tarkista seuraava ottelu (luo/päivitä)
    console.log('matches', matches)
    const nextMatch = matches.find(m => m.number === match.winnerToNumber)
    console.log('next', nextMatch)
    if (!nextMatch) {
      console.log('Luodaan uusi ottelu')
      const matchObj = {
        tournament: match.tournament.id,
        player1: match.number%2 === 0 ? null : winner.id,
        player2: match.number%2 === 0 ? winner.id : null,
        number: match.winnerToNumber,
        winnerToNumber: 100,
        wo1: false,
        wo2: false,
      }
      matchService
        .create([matchObj])
        .then(returnedMatch => {
          console.log(returnedMatch)
        })
    }
    else {
      console.log('Ottelu on luotu aiemmin')
      const matchObj = {
        ...nextMatch,
        player1: nextMatch.player1 ? nextMatch.player1.id : null,
        player2: nextMatch.player2 ? nextMatch.player2.id : null,
        tournament: nextMatch.tournament.id,
        winnerToNumber: 101
      }
      matchService
        .update(matchObj.id, matchObj)
        .then(returnedMatch => {
          console.log(returnedMatch)
        })
    }
  }

  return (
    <div>
      Valitse turnaus: <br />
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Tournament</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTournament}
          onChange={handleChange}
        >
          {tournaments.map((tournament) =>
            <MenuItem key={tournament.id} value={tournament.id}>{tournament.name}</MenuItem>
          )}
        </Select>
      </FormControl>
      <Matches matches={matches ? matches : []} handleConfirmBtn={handleConfirmBtn} />

    </div>
  )
}

export default DrawViewTemp