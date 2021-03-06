<template>
  <div
    class="card-container"
    :class="{ flipped: isFlipped }"
    v-on:click="flip"
  >
    <div class="card">
      <div class="card-front">?</div>
      <div class="card-back">{{ isFlipped ? value : '' }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Card extends Vue {
  @Prop({ required: true }) private value!: number
  @Prop({ required: true }) private isCorrect: (v: number) => boolean
  @Prop({ required: true }) private eventBus: Vue
  
  private isFlipped = true
  private canFlip = false
  private flipDuration = 250

  mounted () {
    this.eventBus.$on('start', this.start)
  }

  private start () {
    this.canFlip = true
    this.immediateFlip()
  }

  private immediateFlip () {
    this.isFlipped = !this.isFlipped
  }

  private debouncedFlip (correct: boolean) {
    if (this.canFlip) {
      this.canFlip = false
      this.isFlipped = !this.isFlipped

      setTimeout(() => {
        this.canFlip = !correct
      }, this.flipDuration)
    }
  }

  flip () {
    if (this.canFlip) {
      const correct = this.isCorrect(this.value)
      this.debouncedFlip(correct)
      
      if (!correct) {
        setTimeout(this.immediateFlip, 300)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
$primary: #3772ff
$secondary: #44BBA4
$dark: #32292F
$light: #D1E3DD
$alert: #F5CB5C

$card-flip-duration: 250ms

.card-container
  position: relative
  display: flex
  height: 128px
  padding: 10px
  margin-bottom: 25px
  flex-direction: row
  align-items: center
  justify-content: center
  font-size: 3em
  perspective: 1000px
  cursor: pointer

  @media (max-width: 600px)
    height: 100px
    font-size: 1em

  &.flipped
    .card
      transform: rotateY(180deg)

  .card
    position: relative
    width: 100%
    height: 100%
    transform-style: preserve-3d
    transition: transform $card-flip-duration

    .card-front, .card-back
      position: absolute
      width: 100%
      height: 100%
      border: 5px solid $dark
      border-radius: 1em
      box-shadow: 2px 2px 4px $dark
      display: flex
      align-items: center
      justify-content: center
      -webkit-backface-visibility: hidden
      backface-visibility: hidden
      color: $dark
      background-color: $light

    .card-back
      transform: rotateY(180deg)

@keyframes card-flip
  0%
    transform: rotateY(0deg) scale(1)
  50%
    transform: rotateY(90deg) scale(1.2)
  100%
    transform: rotateZ(180deg) scale(1)
</style>