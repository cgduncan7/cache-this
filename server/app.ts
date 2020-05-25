import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import Game from './models/game'

const app: express.Application = express()

app.use(bodyParser.json())

app.options('/games', cors(), (req, res) => {
  res.sendStatus(200)
})

app.post('/games', cors(), (req, res, done) => {
  const { body } = req
  const { mode } = body

  if (!mode) {
    res.status(400).send({ message: 'No game mode provided'})
    done()
    return
  }

  try {
    const newGame = new Game(mode)
    res.status(200).send(newGame)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

export default app