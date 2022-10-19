import React from 'react'
import Result from './Result'

const Match = ({ match, handleConfirmBtn }) => {
  const woObj = {
    name: '',
    surname: 'w.o.'
  }
  const points1 = match.points1
  const points2 = match.points2
  const player1 = match.player1 ? match.player1 : woObj
  const player2 = match.player2 ? match.player2 : woObj

  const framesWon = (plr) => {
    // console.log({ p1: points1, p2: points2, plr: plr })
    let total = 0
    switch (plr) {
    case 1:
      points1.forEach((p1, index) => {
        const hasWon = p1 > points2[index] ? true : false
        if (hasWon) total++
      })
      return total
    case 2:
      points2.forEach((p2, index) => {
        const hasWon = p2 > points1[index] ? true : false
        if (hasWon) total++
      })
      return total

    default:
      break
    }
  }

  // console.log(match)
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{framesWon(1)}</td>
            {/* <td>{match.player1.surname}</td> */}
            <td>{player1.surname}</td>
            {match.points1.map((points, index) =>
              <td key={index}>{points}</td>)}
          </tr>
          <tr>
            <td>{framesWon(2)}</td>
            {/* <td>{match.player2.surname}</td> */}
            <td>{player2.surname}</td>
            {match.points2.map((points, index) =>
              <td key={index}>{points}</td>)}
          </tr>
        </tbody>
      </table>
      <span>
        <Result match={match} handleConfirmBtn={handleConfirmBtn}/>
      </span>
    </div>
  )
}

export default Match