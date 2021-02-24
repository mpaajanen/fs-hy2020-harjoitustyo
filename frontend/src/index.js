import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const players = [
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

ReactDOM.render(
  <App players={players} />,
  document.getElementById('root')
)