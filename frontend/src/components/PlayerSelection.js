import React, { useEffect } from 'react'
import PlayerSelectionList from './PlayerSelectionList'
import { makeStyles } from '@material-ui/core/styles'
import Grid from'@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const PlayerSelection = ({ players, onPlayerSelected }) => {
  const [checked, setChecked] = React.useState([])
  const [left, setLeft] = React.useState([])
  const [right, setRight] = React.useState([])

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }))

  const classes = useStyles()

  useEffect(() => {
    setLeft(players.players)

  }, [])

  useEffect(() => {
    onPlayerSelected(right)
  }, [right])

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1)
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1)
  }

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

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

  return (
    <div>
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
        <Grid item><PlayerSelectionList side={left} checked={checked} onToggle={(checked) => handleToggle(checked)} /></Grid>
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
        <Grid item><PlayerSelectionList side={right} checked={checked} onToggle={(checked) => handleToggle(checked)} /></Grid>
      </Grid>
    </div>
  )
}

export default PlayerSelection