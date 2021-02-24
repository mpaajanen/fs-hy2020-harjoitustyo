import React, {useState, useEffect} from 'react'
import Player from './components/Player'
import playerService from './services/player'

const App = ( props ) => {
    const [players, setPlayers] = useState(props.players)
    const [newName, setNewName] = useState('New name...')
    const [newSurname, setNewSurname] = useState('New surname...')

    useEffect(() => {
        playerService
            .getAll()
            .then(initialPlayers => {
                setPlayers(initialPlayers)
            })
        }, [])
        
    const addPlayer = (event) => {
        event.preventDefault()
        const playerObject = {
            name: newName,
            surname: newSurname,
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

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleSurnameChange = (event) => {
        setNewSurname(event.target.value)
    }

    return (
        <div>
            <h1>Players:</h1>
            <ul>
                {players.map((player, i) => 
                    <Player key={player.id} player={player} />
                )}
            </ul>
            <form onSubmit={addPlayer}>
                Name: 
                <input
                    value={newName}
                    onChange={handleNameChange}
                /><br />
                Surname: 
                <input
                    value={newSurname}
                    onChange={handleSurnameChange}
                /><br />
                <button type="submit">Add player</button>
            </form>   
        </div>
    )
}

export default App