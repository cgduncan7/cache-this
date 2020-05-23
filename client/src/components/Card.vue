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
  
  private isFlipped = false // true ~~> value is visible
  private canFlip = true
  private flipDuration = 250

  private debouncedFlip () {
    if (this.canFlip) {
      this.canFlip = false
      this.isFlipped = !this.isFlipped

      setTimeout(() => {
        this.canFlip = true
      }, this.flipDuration)
    }
  }

  flip () {
    this.debouncedFlip()
  }
}
</script>

<style lang="sass" scoped>
$card-flip-duration: 250ms

.card-container
  position: relative
  display: flex
  width: 200px
  height: 200px
  flex-direction: row
  align-items: center
  justify-content: center
  font-size: 3em
  perspective: 1000px

  &.flipped
    .card
      transform: rotateY(180deg)

  .card
    position: relative
    width: 100%
    height: 100%
    border: 5px solid black
    border-radius: 1em
    box-shadow: 4px 4px 16px black
    transform-style: preserve-3d
    transition: transform $card-flip-duration

    .card-front, .card-back
      position: absolute
      width: 100%
      height: 100%
      display: flex
      align-items: center
      justify-content: center
      -webkit-backface-visibility: hidden
      backface-visibility: hidden

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