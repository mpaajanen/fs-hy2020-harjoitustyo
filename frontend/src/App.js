import React, { useState, useEffect } from 'react'
import AddPlayerForm from './components/AddPlayerForm'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import playerService from './services/player'
import tournamentService from './services/tournament'
import matchService from './services/match'
import ListPlayers from './components/ListPlayers'
import Menu from './components/Menu'
import Tournament from './components/Tournament'
// import AddTournamentForm from './components/AddTournamentForm'
import CreateTournament from './components/CreateTournament'
import MatchesTemp from './components/MatchesTemp'
import DrawViewTemp from './components/DrawViewTemp'

const App = () => {
  const [players, setPlayers] = useState([])
  const [user, setUser] = useState(null)
  const [currentContent, setCurrentContent] = useState('players')

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
      tournamentService.setToken(user.token)
      matchService.setToken(user.token)
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

  const showLogin = () => {
    return (
      <LoginForm handleLogin={handleLogin} />
    )
  }

  const contentSelection = () => {
    switch (currentContent) {
    case 'players':
      return (
        <div>
          <ListPlayers players={players} onRemove={(updatedList) => setPlayers(updatedList)} />
          <AddPlayerForm players={players} onAdd={(returnedPlayer) => setPlayers(players.concat(returnedPlayer))} />
        </div>
      )
    case 'tournament':
      return(
        <div>
          <Tournament />
          {/* <AddTournamentForm onCreate={(returnedTournament) => createTournament(returnedTournament)} /> */}
          <CreateTournament players={players} />
        </div>
      )
    case 'matches':
      return(
        <div>
          <MatchesTemp />
        </div>
      )
    case 'draw':
      return(
        <div>
          <DrawViewTemp />
        </div>
      )
    default:
      break
    }

  }

  const showContent = () => {
    return (
      <div>
        <Logout handleLogout={handleLogout} loggedUser={user.name} />
        <Menu onSelection={(selection) => setCurrentContent(selection)} />
        {contentSelection()}
      </div>
    )
  }

  // const createTournament = (tournament) => {
  //   console.log(tournament)
  // }

  return (
    <div>
      {user === null ?
        showLogin() :
        showContent()}

    </div>
  )
}

export default App