import React from 'react'
import matchService from '../services/match'
import Button from '@material-ui/core/Button'

const clickHandler = () => {
  console.log('click')

  const matchObject = {
    tournament: '60b744cbfaa68d32945f5f0f',
    player1: '60a63e0bd391392decab1f07',
    player2: '60a63e41d391392decab1f08',
    points1: [0, 78, 53],
    points2: [90, 6, 51],
  }

  matchService
    .create(matchObject)
    .then(returnedMatch => {
      console.log(returnedMatch)
    })
}

const MatchesTemp = () => {
  return (
    <div>
      Otteluiden testaaminen
      <Button onClick={() => clickHandler()}>Paina</Button>
    </div>
  )
}

export default MatchesTemp