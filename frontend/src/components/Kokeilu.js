import React, { useState } from 'react'
import { useEffect } from 'react'
import tournamentService from '../services/tournament'
import playerService from '../services/player'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
// import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

const Kokeilu = () => {
  const [tournaments, setTournaments] = useState([])
  const [players, setPlayers] = useState([])
  const [selectedTournament, setSelectedTournament] = useState('')
  const [participants, setParticipants] = useState([])
  const [checked, setChecked] = React.useState([])
  const [left, setLeft] = React.useState([])
  const [right, setRight] = React.useState([])

  // const [pid, setPid] = useState([])
  console.log('render')

  useEffect(() => {
    tournamentService
      .getAll()
      .then(initialTournaments => {
        setTournaments(initialTournaments)
      })
    playerService
      .getAll()
      .then(initialPlayers => {
        setPlayers(initialPlayers)
        setSelections(initialPlayers)
      })
  }, [])

  useEffect(() => {
    console.log('turnaus vaihtui')
    const tournament = tournaments.find(tournament => tournament.id === selectedTournament)
    try {
      console.log(tournament.participant)
      setParticipants([...tournament.participant])
      setSelections([...players])
    } catch (e) {
      console.log('Ei pelaajia')
    }
  }, [selectedTournament])

  useEffect(() => {
    console.log(participants)
  }, [participants])

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    // pelaajavalinta
    root: {
      margin: 'auto',
    },
    paper: {
      width: 200,
      height: 230,
      overflow: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  }))

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1)
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1)
  }

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleAllRight = () => {
    setRight(right.concat(left))
    setLeft([])
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleAllLeft = () => {
    setLeft(left.concat(right))
    setRight([])
  }

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`

          return (
            <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              {/* <ListItemText id={labelId} primary={`List item ${value + 1}`} /> */}
              <ListItemText id={labelId} primary={value.surname} />
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Paper>
  )

  const classes = useStyles()

  const handleChange = (event) => {
    setSelectedTournament(event.target.value)
  }

  const setSelections = initialPlayers => {
    const tournament = tournaments.find(tournament => tournament.id === selectedTournament)
    try {
      const participantIds = tournament.participant.map(participant => participant.id)
      const available = initialPlayers.filter(p => !participantIds.includes(p.id))
      setLeft([...available])
      setRight(tournament.participant)
    } catch (e) {
      console.log('Ei valittua turnausta')
    }

  }

  const lisaysTesti = () => {
    event.preventDefault()
    const tourid = '60ace01d40f1f843d8ff8314'
    const uusiPelaaja = { testi: '60a63de9d391392decab1f06' }

    const tournament = tournaments.find(tournament => tournament.id === tourid)

    tournamentService
      .addPlayer(tournament.id, uusiPelaaja)
      .then(returnedTournament => {
        console.log(returnedTournament)
        setParticipants(par => par.concat(players.find(p => p.id === uusiPelaaja.testi)))
      })
  }

  const poistoTesti = () =>  {
    event.preventDefault()
    const tourid = '60ace01d40f1f843d8ff8314'
    const poistoPelaaja = '60a63de9d391392decab1f06'

    const tournament = tournaments.find(tournament => tournament.id === tourid)
    const participantIds = tournament.participant.map(p => p.id)
    console.log(participantIds)

    // const filterParticipants = (participantId) => {
    //   console.log(participantId + '...' + poistoPelaaja)
    //   return participantId !== poistoPelaaja
    // }
    // const participantsAfterRemoval = participantIds.filter(filterParticipants)
    // console.log(participantsAfterRemoval)

    const changedTournament = { ...tournament, participant: participantIds.filter(pid => pid !== poistoPelaaja) }
    console.log(changedTournament)

    tournamentService
      .update(tournament.id, changedTournament)
      .then(returnedTournament => {
        setTournaments(tournaments.map(tournament => tournament.id !== tourid ? tournament : returnedTournament))
      })
  }

  const resetoi = () => {
    event.preventDefault()
    const tourid = '60ace01d40f1f843d8ff8314'
    // const pelaajat = ['60a63d8ed391392decab1f05', '60a63de9d391392decab1f06']
    // const pelaajat = ['60a63d8ed391392decab1f05']
    const uusiPelaaja = '60a63d8ed391392decab1f05'

    const tournament = tournaments.find(tournament => tournament.id === tourid)
    console.log(tournament.participant)
    const player = players.find(player => player.id === uusiPelaaja)
    console.log(player)

    const resetTournament = { ...tournament, participant: player }
    // const resetTournament = { ...tournament, participant: tournament.participant.concat(player) }
    console.log(resetTournament)

    tournamentService
      .update(tournament.id, resetTournament)
      .then(returnedTournament => {
        console.log(returnedTournament)
        setTournaments(tournaments.map(tournament => tournament.id !== tourid ? tournament : returnedTournament))
      })
  }

  return (
    <div>
      <form onSubmit={event => lisaysTesti(event)}>
        <button type="submit">Lisaa pelaaja</button>
      </form>
      <form onSubmit={event => poistoTesti(event)}>
        <button type="submit">Poista pelaaja</button>
      </form>
      <form onSubmit={event => resetoi(event)}>
        <button type="submit">...resetoi</button>
      </form>
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
          // <MenuItem value={20}>Twenty</MenuItem>
          // <MenuItem value={30}>Thirty</MenuItem>
          )}
        </Select>
      </FormControl>
      <div>
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
          <Grid item>{customList(left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
            ≫
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
            &gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
            &lt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
            ≪
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList(right)}</Grid>
        </Grid>
      </div>
      <div>
        <h1>Players:</h1>
        <ul>
          {participants.map((player) =>
            <li key={player.id}>{player.name} {player.surname}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Kokeilu