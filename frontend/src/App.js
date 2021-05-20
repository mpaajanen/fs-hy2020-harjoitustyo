import React, { useState, useEffect } from 'react'
import AddPlayerForm from './components/AddPlayerForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import playerService from './services/player'
import ListPlayers from './components/ListPlayers'

const App = () => {
  const [players, setPlayers] = useState([])
  const [user, setUser] = useState(null)

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
      })
  }

  const showLogin = () => {
    return (
      <LoginForm handleLogin={handleLogin} />
    )
  }

  const showContent = () => {
    return (
      <div>
        <Logout handleLogout={handleLogout} loggedUser={user.name} />
        <ListPlayers players={players} />
        <AddPlayerForm addPlayer={addPlayer} />
      </div>
    )
  }

  return (
    <div>
      {user === null ?
        showLogin() :
        showContent()}

    </div>
  )
}

export default App