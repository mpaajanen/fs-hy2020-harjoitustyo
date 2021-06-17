import React from 'react'
import Result from './Result'

const Match = ({ match }) => {
  console.log(match)
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{match.player1.surname}</td>
            {match.points1.map((points, index) =>
              <td key={index}>{points}</td>)}
          </tr>
          <tr>
            <td>{match.player2.surname}</td>
            {match.points2.map((points, index) =>
              <td key={index}>{points}</td>)}
          </tr>
        </tbody>
      </table>
      <span>
        <Result />
      </span>
    </div>
  )
}

export default Match