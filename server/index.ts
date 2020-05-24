import express = require('express')
import bodyParser = require('body-parser')

import Game from './model/game'

const app = express()

app.use(bodyParser.json())

app.post('/games', (req, res) => {
  const { body } = req
  const { mode } = body

  try {
    const newGame = new Game(mode)
    res.status(200).send(newGame)
  } catch (error) {
    res.sendStatus(400)
  }
})