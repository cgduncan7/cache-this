import Game from '../../models/game'
import GameMode from '../../types/GameMode'

describe('Game', () => {
  it('should create a new easy Game instance', () => {
    const newGame = new Game(GameMode.Easy)
    expect(newGame.mode).toEqual(GameMode.Easy)
    expect(newGame.values.length).toEqual(4)
  })

  it('should create a new medium Game instance', () => {
    const newGame = new Game(GameMode.Medium)
    expect(newGame.mode).toEqual(GameMode.Medium)
    expect(newGame.values.length).toEqual(8)
  })

  it('should create a new hard Game instance', () => {
    const newGame = new Game(GameMode.Hard)
    expect(newGame.mode).toEqual(GameMode.Hard)
    expect(newGame.values.length).toEqual(12)
  })
})