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
      <Matches matches={matches ? matches : []} />

    </div>
  )
}

export default DrawViewTemp