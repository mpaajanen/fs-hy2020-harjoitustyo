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

const Result = ({ match }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Syötä tulos
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
        <span><ResultForm match={match}/></span>
      </Popover>
    </div>
  )}

export default Result