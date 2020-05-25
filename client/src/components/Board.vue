<template>
  <div id="board">
    <Card v-for="cardValue in cardValues" :value="cardValue" :key="cardValue" />
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
}
</script>

<style lang="sass" scoped>
#board
  display: flex
  flex-direction: row
  flex-wrap: wrap
  align-items: center
  justify-content: space-around
</style>