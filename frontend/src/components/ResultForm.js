import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import DoneIcon from '@material-ui/icons/Done'
import DeleteIcon from '@material-ui/icons/Delete'

const ResultForm = () => {
  const frameObj = {
    p1: '',
    p2: ''
  }
  const [pointFields, setPointFields] = useState([frameObj])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('tulos lähetetty', pointFields)
  }

  // const handleChange = (event) => {
  //   event.preventDefault
  //   console.log('p1')
  // }

  const handleChange = (index, event) => {
    const newPointFields = pointFields.map((i, ind) => {
      if(ind === index) {
        i[event.target.name] = event.target.value
      }
      return i
    })

    setPointFields(newPointFields)
  }

  const handleAddFields = () => {
    setPointFields([...pointFields, frameObj])
  }

  const handleRemoveFields = index => {
    const values  = [...pointFields]
    values.splice(index, 1)
    setPointFields(values)
  }

  return (
    <form onSubmit={event => handleSubmit(event)}>
      {pointFields.map((pointField, index) => (
        <div key={index} >
          <TextField
            name="p1"
            label="p1"
            variant="filled"
            value={pointField.p1}
            onChange={event => handleChange(index, event)}
          />
          <TextField
            name="p2"
            label="p2"
            variant="filled"
            value={pointField.p2}
            onChange={event => handleChange(index, event)}
          />

          <IconButton onClick={handleAddFields}          >
            <DoneIcon />
          </IconButton>
          <IconButton disabled={pointFields.length === 1} onClick={() => handleRemoveFields(index)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <button type="submit">Tallenna</button>
    </form>
  )
}

export default ResultForm