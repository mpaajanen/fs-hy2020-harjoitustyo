import React, { useState } from 'react'
import Notification from './Notification'
import loginService from '../services/login'
import playerService from '../services/player'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedTournamentappUser', JSON.stringify(loggedUser)
      )
      playerService.setToken(loggedUser.token)
      setUsername('')
      setPassword('')
      handleLogin(loggedUser)
    }
    catch (exception){
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return(
    <div>        <h2>Log in to application</h2>
      <Notification message={errorMessage} />
      <form onSubmit={event => handleSubmit(event)}>
        <div>
            username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

export default LoginForm