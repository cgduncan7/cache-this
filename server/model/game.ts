import GameMode from '../types/GameMode'

export interface IGame {
  readonly mode: GameMode
  readonly values: number[]
}

export default class Game implements IGame {
  readonly mode: GameMode
  readonly values: number[]

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

    this.values = this.generateValues(numValues)
  }

  private generateValues (numValues: number): number[] {
    const v = []
    for (let i = 0; i < numValues; i += 1) {
      v.push(this.getRandomValue())
    }
    return v
  }

  // returns number 1 - 99
  private getRandomValue (): number {
    return Math.floor(Math.random() * 99) + 1
  }
}