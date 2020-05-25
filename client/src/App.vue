<template>
  <div id="app">
    <div class="header">
      <a href="https://github.com/cgduncan7/cache-this"><img src="@/assets/github.png" /></a>
      <a href="#" v-on:click="playAgain"><h1>CACHE THIS</h1></a>
    </div>
    <div id="mode-select" v-if="gameMode === 0">
      <h2>Choose your difficulty</h2>
      <button v-on:click="selectEasy" class="easy">Easy</button>
      <button v-on:click="selectMedium" class="medium">Medium</button>
      <button v-on:click="selectHard" class="hard">Hard</button>
    </div>
    <Board
      v-if="gameMode && cardValues"
      :cardValues="cardValues"
      :solution="solution"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Board from '@/components/Board.vue'
import GameMode from './types/GameMode'
import { newGame } from './models/Game'

@Component({
  components: {
    Board,
  },
})
export default class App extends Vue {
  private gameMode: GameMode = GameMode.None
  private cardValues?: number[] = []
  private solution?: number[] = []

  mounted () {
    this.$on('playAgain', this.playAgain)
  }

  playAgain () {
    this.gameMode = GameMode.None
    this.cardValues = []
    this.solution = []
  }

  private selectGameMode (mode: GameMode) {
    this.gameMode = mode
    if (mode !== GameMode.None) {
      this.newGame(mode)
    }
  }

  selectEasy () {
    this.selectGameMode(GameMode.Easy)
  }

  selectMedium () {
    this.selectGameMode(GameMode.Medium)
  }

  selectHard () {
    this.selectGameMode(GameMode.Hard)
  }

  async newGame (gameMode: GameMode) {
    const game = await newGame(gameMode)
    const { values, solution } = game
    this.cardValues = values
    this.solution = solution
  }
}
</script>

<style lang="sass">
$primary: #3772ff
$secondary: #44BBA4
$dark: #32292F
$light: #D1E3DD
$alert: #F5CB5C

html
  background-color: white

*
  box-sizing: border-box

body
  margin: 0

h1, h2, h3, h4, h5
  display: inline-block

button
  outline: none
  margin: 10px
  padding: 10px
  border: none
  border-radius: 16px
  box-shadow: 0px 0px 4px $dark
  color: inherit
  font: inherit
  background-color: $alert
  cursor: pointer

  &:hover
    box-shadow: 0px 0px 8px $dark

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $dark
  background-color: inherit

  .header
    position: relative
    text-align: center
    background: $primary
    box-shadow: 0px 0px 4px black
    color: white

    a
      color: inherit

    img
      position: absolute
      margin: auto
      height: 32px
      width: 32px
      margin-left: 8px
      margin-top: 24px
      left: 0

  #mode-select
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-around

    button
      width: 150px
      height: 100px
      font-size: 2em
      font-weight: 600
      color: white

      &.easy
        background-color: #00916E

      &.medium
        background-color: #FFC145

      &.hard
        background-color: #FA003F
</style>
