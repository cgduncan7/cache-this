// import types
import { Server } from 'http'
import request from 'supertest'

import GameMode from '../types/GameMode'

import app from '../app'

let server: Server
const testPort = 3001

beforeEach(async () => {
  server = await app.listen(testPort)
})

afterEach(async () => {
  await server.close()
})

describe('POST /games', () => {
  it('should create/return new game with correct mode provided', async () => {
    const url = '/games'
    const body = {
      mode: GameMode.Easy,
    }
    
    const response: request.Response = await request(server)
      .post(url)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)

    const game = response.body
    expect(game).toBeDefined()
    expect(game.mode).toEqual(GameMode.Easy)
  })

  it('should return 400 with incorrect game mode', async () => {
    const url = '/games'
    const body = {
      mode: GameMode.None,
    }
    
    const response: request.Response = await request(server)
      .post(url)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
  })
})