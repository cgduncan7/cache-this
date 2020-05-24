<template>
  <div id="app">
    <div class="header">
      <a href="https://github.com/cgduncan7/cache-this"><img src="@/assets/github.png" /></a>
      <h1>CACHE THIS</h1>
    </div>
    <div id="mode-select" v-if="gameMode === 0">
      <h2>Choose your difficulty</h2>
      <button v-on:click="selectEasy" class="easy">Easy</button>
      <button v-on:click="selectMedium" class="medium">Medium</button>
      <button v-on:click="selectHard" class="hard">Hard</button>
    </div>
    <Board v-if="gameMode && cardValues" :cardValues="cardValues" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Board from '@/components/Board.vue'
import GameMode from '@/types/GameMode'

@Component({
  components: {
    Board,
  },
})
export default class App extends Vue {
  private gameMode: GameMode = GameMode.None
  private cardValues: number[]

  private selectGameMode (mode: GameMode) {
    this.gameMode = mode
    if (mode !== GameMode.None) {
      this.requestGame(mode)
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

  requestGame (gameMode: GameMode) { // TODO: request from server
    switch (gameMode) {
      case GameMode.Easy:
        this.cardValues = [1,2,3,4]
        break
      case GameMode.Medium:
        this.cardValues = [1,2,3,4,5,6,7,8]
        break
      case GameMode.Hard:
        this.cardValues = [1,2,3,4,5,6,7,8,9,10,11,12]
        break
      default:
        this.selectGameMode(GameMode.None)
    }
  }
}
</script>

<style lang="sass">
$phone-width: 600px
$tablet-width: 768px
$desktop-width: 1200px

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
  border: 1px solid black
  color: inherit
  font: inherit
  background-color: white
  cursor: pointer

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

  .header
    position: relative
    text-align: center
    background: green
    box-shadow: 0px 0px 4px black
    color: white

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
        background-color: green

      &.medium
        background-color: yellow

      &.hard
        background-color: red

      &:hover
        border: 2px solid black
</style>
