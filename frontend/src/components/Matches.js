import React from 'react'
import Match from './Match'
import { Grid } from '@material-ui/core'

const Matches = ({ matches, handleConfirmBtn, handleResultUpdate }) => {
  const arrangedMatches = matches.sort((a, b) => {
    if (a.round === b.round) {
      return a.number - b.number
    }
    return a.round - b.round
  })
  console.log('matches', matches)
  console.log('arranged', arrangedMatches)


  // return (
  //   <div>
  //     {arrangedMatches.map((match) =>
  //       <Match key={match.id} match={match} handleConfirmBtn={handleConfirmBtn} handleResultUpdate={handleResultUpdate} />
  //     )}
  //   </div>
  // )

  return (
    <Grid container spacing={1} alignItems={'center'}>
      <Grid item>
        <h1>1. kierros</h1>
        <Grid container spacing={2} direction={'column'}>
          {arrangedMatches.map((match) => {
            if (match.round === 1) {
              return (
              // eslint-disable-next-line react/jsx-key
                <Grid item>
                  <Match key={match.id} match={match} handleConfirmBtn={handleConfirmBtn} handleResultUpdate={handleResultUpdate} />
                </Grid>
              )
            }
          })}
        </Grid>
      </Grid>
      <Grid item>
        <h1>2. kierros</h1>
        <Grid container spacing={2} direction={'column'}>
          {arrangedMatches.map((match) => {
            if (match.round === 2) {
              return (
              // eslint-disable-next-line react/jsx-key
                <Grid item>
                  <Match key={match.id} match={match} handleConfirmBtn={handleConfirmBtn} handleResultUpdate={handleResultUpdate} />
                </Grid>
              )
            }
          })}
        </Grid>
      </Grid>
      <Grid item>
        <h1>3. kierros</h1>
        <Grid container spacing={2} direction={'column'}>
          {arrangedMatches.map((match) => {
            if (match.round === 3) {
              return (
              // eslint-disable-next-line react/jsx-key
                <Grid item>
                  <Match key={match.id} match={match} handleConfirmBtn={handleConfirmBtn} handleResultUpdate={handleResultUpdate} />
                </Grid>
              )
            }
          })}
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Matches


// <Grid container spacing={2}>
//   <Grid item xs={6} md={4}>
//     hiihoo<br />
//     hoohii
//   </Grid>
//   <Grid item xs={6} md={4}>
//     <div>
//       <table>
//         <tbody>
//           <tr>
//             <td>11</td>
//             <td>12</td>
//           </tr>
//           <tr>
//             <td>21</td>
//             <td>22</td>
//           </tr>
//         </tbody>
//       </table>
//       <span>juupa</span>
//     </div>
//   </Grid>
//   <Grid item xs={6} md={4}>
//     hiihoo
//   </Grid>
// </Grid>