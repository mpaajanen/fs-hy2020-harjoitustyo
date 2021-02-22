const { request, response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(requestLogger)
  
let players = [
    {
        id: 0,
        name: 'Ronnie',
        surname: 'O\'Sullivan',
    },
    {
        id: 1,
        name: 'Jordan',
        surname: 'Brown',
    },
    {
        id: 2,
        name: 'Ding',
        surname: 'Junhui',
    },
    ]

app.get('/', (req, res) => {
    res.send('<h1>Testing...</h1>')
})
    
app.get('/api/players', (req, res) => {
    res.json(players)
})

app.get('/api/players/:id', (request, response) => {
    const id = Number(request.params.id)
    const player = players.find(player => player.id === id)
    if (player){
        response.json(player)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/players/:id', (request, response) => {
    const id = Number(request.params.id)
    const player = players.filter(player => player.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = players.length > 0
      ? Math.max(...players.map(n => n.id))
      : 0
    return maxId + 1
}

app.post('/api/players/', (request, response) => {
    const body = request.body

    if (!body.name || !body.surname) {
        return response.status(400).json({ 
            error: 'name, surname or both missing' 
        })
    }

    const player = {
        id: generateId(),
        name: body.name,
        surname: body.surname
    }

    players = players.concat(player)

    response.json(player)
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)