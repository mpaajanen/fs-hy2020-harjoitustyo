import React from 'react'

const handleSubmit = () => {
  console.log('tulos lähetetty')
}

const handlePointChange1 = (event) => {
  event.preventDefault
  console.log('p1')
}

const handlePointChange2 = (event) => {
  event.preventDefault
  console.log('p2')
}

const ResultForm = () => {
  return (
    <form onSubmit={event => handleSubmit(event)}>
    Points p1 :
      <input
        value={''}
        onChange={handlePointChange1}
      />
      <br />
      Points p2 :
      <input
        value={''}
        onChange={handlePointChange2}
      />
      <button type="submit">Add player</button>
    </form>
  )
}

export default ResultForm