/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Player from './components/Player'
import Notification from './components/Notification'
import AddPlayerForm from './components/AddPlayerForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import playerService from './services/player'
import login from './services/login'

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

  const handleLogin = (user) => {
    console.log('logging in with', user)
    setUser(user)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedTournamentappUser')
    setUser(null)
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

  const showLogin = () => {
    return (
      <LoginForm handleLogin={handleLogin} />
    )
  }

  const showLogout = () => {
    return (
      <div>
        <Notification message={errorMessage} />
        <Logout handleLogout={handleLogout} loggedUser={user.name} />
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

  return (
    <div>
      {user === null ?
        showLogin() :
        showLogout()}

    </div>
  )
}

export default App