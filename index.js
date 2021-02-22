const http = require('http')

let players = [
    {
        name: 'Ronnie',
        surname: 'O\'Sullivan',
    },
    {
        name: 'Jordan',
        surname: 'Brown',
    },
    {
        name: 'Ding',
        surname: 'Junhui',
    },
    ]

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(players))
    })
const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)