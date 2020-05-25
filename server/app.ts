import express from 'express'
import bodyParser from 'body-parser'

import Game from './model/game'

const app: express.Application = express()

app.use(bodyParser.json())

app.post('/games', (req, res) => {
  const { body } = req
  const { mode } = body

  try {
    const newGame = new Game(mode)
    res.status(200).send(newGame)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

export default app