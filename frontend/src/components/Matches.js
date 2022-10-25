import React from 'react'
import Match from './Match'

const Matches = ({ matches, handleConfirmBtn, handleResultUpdate }) => {
  return (
    <div>
      {matches.map((match) =>
        <Match key={match.id} match={match} handleConfirmBtn={handleConfirmBtn} handleResultUpdate={handleResultUpdate} />
      )}
    </div>
  )
}

export default Matches