import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'

const PlayerSelectionList = ({ side, checked, onToggle }) => {

  const useStyles = makeStyles((theme) => ({
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

  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {side.map((value) => {
          const labelId = `transfer-list-item-${value}-label`

          return (
            <ListItem key={value.id} role="listitem" button onClick={onToggle(value)}>
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
}

export default PlayerSelectionList