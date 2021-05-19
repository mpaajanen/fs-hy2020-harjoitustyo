import React from 'react'

const Logout = ({ handleLogout, loggedUser }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogout()
  }

  return (
    <div>
      {loggedUser} is logged in
      <form onSubmit={event => handleSubmit(event)}>
        <button type="submit">logout</button>
      </form>
    </div>
  )
}

export default Logout