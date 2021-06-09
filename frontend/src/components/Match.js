import React from 'react'

const Match = ({ match }) => {
  console.log(match)
  return (
    <div>
      <span>
        {match.player1.surname} - {match.player2.surname}
      </span>
    </div>
  )
}

export default Match