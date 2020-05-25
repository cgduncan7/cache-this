import axios, { AxiosRequestConfig } from 'axios'

import GameMode from '../types/GameMode'

export interface GameRequest {
  mode: GameMode;
}

export interface Game {
  readonly mode: GameMode;
  readonly values: number[];
  readonly solution: number[];
}

const url = process.env.SERVER_URL || 'http://localhost:3000'

export async function newGame (mode: GameMode) {
  const body: GameRequest = {
    mode
  }

  const options: AxiosRequestConfig = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  
  const response = await axios.post(`${url}/games`, body, options)

  if (response.status === 200) {
    const game: Game = await response.data
    return game
  } else {
    const error = await response.data
    throw new Error(error)
  }
}