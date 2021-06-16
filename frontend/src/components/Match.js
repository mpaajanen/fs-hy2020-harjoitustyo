import React from 'react'
import Result from './Result'

const Match = ({ match }) => {
  console.log(match)
  return (
    <div>
      <span>
        {match.player1.surname} - {match.player2.surname}
        <Result />
      </span>
    </div>
  )
}

export default Match