<template>
  <div id="board">
    <div class="controls">
      <button v-if="!started" v-on:click="start">Start</button>
      <h3 v-if="started">{{ formatElapsedTime() }}</h3>
    </div>
    <div class="cards">
      <Card
        v-for="cardValue in cardValues"
        :value="cardValue"
        :key="cardValue"
        :isCorrect="isCorrect"
        :eventBus="eventBus"
      />
    </div>
    <div class="notification" v-if="solved">
      <h2>You won!</h2>
      <button v-on:click="playAgain">Play again</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Card from '@/components/Card.vue'

@Component({
  components: {
    Card,
  },
})
export default class Board extends Vue {
  @Prop({ required: true }) private cardValues: number[]
  @Prop({ required: true }) private solution: number[]
  private solutionIndex = 0
  private solved = false
  private started = false
  private eventBus = new Vue({})
  private elapsedTime = 0
  private timerId: NodeJS.Timeout

  start () {
    this.eventBus.$emit('start')
    this.started = true
    this.timerId = setInterval(() => {
      this.elapsedTime++
    }, 10)

    this.$watch(() => this.solved, () => {
      if (this.solved === true) {
        clearInterval(this.timerId)
      }
    })
  }

  playAgain () {
    console.log('again')
    this.$parent.$emit('playAgain')
  }

  formatElapsedTime () {
    const ms = this.elapsedTime % 100
    const s = Math.floor(this.elapsedTime / 100)

    return `${s}.${ms < 10 ? '0' + ms : ms} seconds`
  }

  isCorrect (cardValue: number): boolean {
    if (cardValue === this.solution[this.solutionIndex]) {
      this.stepSolution()
      return true
    }
    return false
  }

  private stepSolution() {
    this.solutionIndex += 1
    if (this.solutionIndex === this.solution.length) {
      this.solved = true
    }
  }
}
</script>

<style lang="sass" scoped>
#board
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

  .controls
    height: 80px

  .cards
    width: 80%
    display: flex
    flex-direction: row
    flex-wrap: wrap
    align-items: center
    justify-content: space-between

  .notification
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
</style>