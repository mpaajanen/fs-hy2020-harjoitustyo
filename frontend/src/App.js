/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Player from './components/Player'
import Notification from './components/Notification'
import AddPlayerForm from './components/AddPlayerForm'
import playerService from './services/player'
import loginService from './services/login'

const App = () => {
  const [players, setPlayers] = useState([])
  const [newName, setNewName] = useState('New name...')
  const [newSurname, setNewSurname] = useState('New surname...')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    playerService
      .getAll()
      .then(initialPlayers => {
        setPlayers(initialPlayers)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTournamentappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      playerService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedTournamentappUser', JSON.stringify(user)
      )
      playerService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addPlayer = (player) => {
    const playerObject = {
      name: player[0],
      surname: player[1],
      id: players.length + 1,
    }

    playerService
      .create(playerObject)
      .then(returnedPlayer => {
        setPlayers(players.concat(returnedPlayer))
        setNewName('')
        setNewSurname('')
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
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

  return (
    <div>
      <Notification message={errorMessage} />
      <div>
        {user.name} is logged in
        <form onSubmit={handleLogout}>
          <button type="submit">logout</button>
        </form>
      </div>

      <h1>Players:</h1>
      <ul>
        {players.map((player, i) =>
          <Player key={player.id} player={player} />
        )}
      </ul>
      <AddPlayerForm addPlayer={addPlayer} />
    </div>
  )
}

export default App