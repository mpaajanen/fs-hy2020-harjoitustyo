import React from 'react'
import Match from './Match'

const Matches = ({ matches }) => {
  return (
    <div>
      {matches.map((match) =>
        <Match key={match.id} match={match} />
      )}
    </div>
  )
}

export default Matches