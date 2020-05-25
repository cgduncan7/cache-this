<template>
  <div id="board">
    <div class="controls">
      <button v-if="!started" v-on:click="start">Start</button>
      <span v-if="started"> GO GO GO</span>
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

  start () {
    this.eventBus.$emit('start')
    this.started = true
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

  .cards
    display: flex
    flex-direction: row
    flex-wrap: wrap
    align-items: center
    justify-content: space-around
</style>