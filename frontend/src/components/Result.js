import React from 'react'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import ResultForm from './ResultForm'

// const handleClick = () => {
//   return (
//     <Popover
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'center',
//       }}
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'left',
//       }}
//     >
//   The content of the Popover.
//     </Popover>
//   )
// }

const Result = ({ match, handleConfirmBtn, handleResultUpdate }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleResultBtn = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // const handleConfirmBtn = () => {
  //   console.log('Tulos vahvistettu')
  // }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleResultBtn}>
        Syötä tulos
      </Button>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={() => handleConfirmBtn(match)}>
        Vahvista
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <span><ResultForm match={match} handleResultUpdate={handleResultUpdate} /></span>
      </Popover>
    </div>
  )}

export default Result