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
  console.log('render matches', matches)

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

  const handleResultUpdate = (event, match, frameScores) => {
    event.preventDefault()
    const updatedMatch = {
      tournament: match.tournament.id,
      player1: match.player1 ? match.player1.id : null,
      player2: match.player2 ? match.player2.id : null,
      points1: frameScores.map(scores => scores.p1),
      points2: frameScores.map(scores => scores.p2),
    }
    matchService
      .update(match.id, updatedMatch)
      .then(returnedMatch => {
        console.log('returnedMatch', returnedMatch)
        const updatedMatch = {
          ...returnedMatch,
          tournament: match.tournament,
          player1: match.player1,
          player2: match.player2,
        }
        const filteredMatches = matches.filter(m => m.id !== returnedMatch.id)
        setMatches(filteredMatches.concat(updatedMatch))
      })
    console.log('tulos päivitetty', updatedMatch)
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
    console.log('match', match)
    console.log('tournaments', tournaments)
    // const thisTour = tournaments.filter(t => {
    //   t.id === match.tournament.id
    // })
    // console.log(thisTour)
    const nextRound = match.round + 1
    const nextNumber = match.number%2 === 0 ? match.number * 0.5 : (match.number + 1) * 0.5
    const nextMatch = matches.find(m => m.round === nextRound && m.number === nextNumber)
    console.log('next', nextMatch)
    if (!nextMatch) {
      console.log('Luodaan uusi ottelu')
      const matchObj = {
        tournament: match.tournament.id,
        player1: match.number%2 === 0 ? null : winner.id,
        player2: match.number%2 === 0 ? winner.id : null,
        round: nextRound,
        number: nextNumber,
        winnerToNumber: 100,
        wo1: false,
        wo2: false,
      }
      matchService
        .create([matchObj])
        .then(returnedMatch => {
          // console.log('retMat', returnedMatch)
          // console.log({
          //   ...returnedMatch[0],
          //   tournament: match.tournament,
          //   player1: match.number%2 === 0 ? null : winner,
          //   player2: match.number%2 === 0 ? winner : null,
          // })
          const hiihoo = {
            ...returnedMatch[0],
            tournament: match.tournament,
            player1: match.number%2 === 0 ? null : winner,
            player2: match.number%2 === 0 ? winner : null,
          }
          setMatches(matches.concat(hiihoo))
        })
      // matchService
      //   .getByTournamentId(selectedTournament)
      //   .then(matches => {
      //   // console.log(matches)
      //     setMatches(matches)
      //   })
    }
    else {
      console.log('Ottelu on luotu aiemmin')
      const matchObj = {
        ...nextMatch,
        player1: nextMatch.player1 ? nextMatch.player1.id : winner.id,
        player2: nextMatch.player2 ? nextMatch.player2.id : winner.id,
        tournament: nextMatch.tournament.id,
        winnerToNumber: 101
      }
      matchService
        .update(matchObj.id, matchObj)
        .then(returnedMatch => {
          // console.log('retMat', returnedMatch)
          // console.log({
          //   ...returnedMatch,
          //   tournament: match.tournament,
          //   player1: nextMatch.player1 ? nextMatch.player1 : winner,
          //   player2: nextMatch.player2 ? nextMatch.player2 : winner,
          // })
          const hiihoo = {
            ...returnedMatch,
            tournament: match.tournament,
            player1: nextMatch.player1 ? nextMatch.player1 : winner,
            player2: nextMatch.player2 ? nextMatch.player2 : winner,
          }
          const updMat = matches.filter(m => m.id !== returnedMatch.id)
          setMatches(updMat.concat(hiihoo))
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
      <Matches matches={matches ? matches : []} handleConfirmBtn={handleConfirmBtn} handleResultUpdate={handleResultUpdate} />

    </div>
  )
}

export default DrawViewTemp