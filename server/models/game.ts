import GameMode from '../types/GameMode'
import { generateRandomValues } from '../libs/random'

export interface IGame {
  readonly mode: GameMode
  readonly values: number[]
  readonly solution: number[]
}

export default class Game implements IGame {
  readonly mode: GameMode
  readonly values: number[]
  readonly solution: number[]

  constructor(m: GameMode) {
    if (m === GameMode.None) throw new Error('Cannot create game with None as mode')
    
    this.mode = m
    
    let numValues
    switch (this.mode) {
      case GameMode.Easy:
        numValues = 4
        break
      case GameMode.Medium:
        numValues = 8
        break
      case GameMode.Hard:
        numValues = 12
        break
    }

    this.values = generateRandomValues(numValues)
    this.solution = this.values.slice(0)
    this.solution.sort((a, b) => a - b)
  }
}