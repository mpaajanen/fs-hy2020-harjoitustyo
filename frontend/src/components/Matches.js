import React from 'react'
import Match from './Match'

const Matches = ({ matches, handleConfirmBtn }) => {
  return (
    <div>
      {matches.map((match) =>
        <Match key={match.id} match={match} handleConfirmBtn={handleConfirmBtn} />
      )}
    </div>
  )
}

export default Matches