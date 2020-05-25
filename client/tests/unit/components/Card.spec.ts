import { expect } from 'chai'
import { shallowMount  } from '@vue/test-utils'
import Card from '@/components/Card.vue'
import Vue from 'vue'

const eventBus = new Vue({})

describe('Card.vue', () => {
  it('is created flipped with 42 as value', () => {
    const value = '42'
    const isCorrect = (_: number) => true
    const wrapper = shallowMount(
      Card,
      {
        propsData: {
          value,
          isCorrect,
          eventBus,
        }
      },
    )

    expect(wrapper.vm.$data.canFlip).to.be.false
    expect(wrapper.vm.$data.isFlipped).to.be.true

    expect(wrapper.text()).to.include('42')
    expect(wrapper.classes()).to.contain('card-container')
  })

  it('is created flipped and cannot be flipped', () => {
    const value = '42'
    const isCorrect = (_: number) => true
    const wrapper = shallowMount(
      Card,
      {
        propsData: {
          value,
          isCorrect,
          eventBus,
        }
      },
    )

    // flip card
    wrapper.vm.flip()
    expect(wrapper.vm.$data.canFlip).to.be.false
    expect(wrapper.vm.$data.isFlipped).to.be.true
  })

  it('flips after eventBus emits start', async () => {
    const value = '42'
    const isCorrect = (_: number) => true
    const wrapper = shallowMount(
      Card,
      {
        propsData: {
          value,
          isCorrect,
          eventBus,
        }
      },
    )

    eventBus.$emit('start')
    expect(wrapper.vm.$data.canFlip).to.be.true
    expect(wrapper.vm.$data.isFlipped).to.be.false
  })

  it('is able to flip and must wait 250ms for flip again', async () => {
    const value = '42'
    const isCorrect = (_: number) => true
    const wrapper = shallowMount(
      Card,
      {
        propsData: {
          value,
          isCorrect,
          eventBus,
        }
      },
    )

    eventBus.$emit('start')

    // flip card
    wrapper.vm.flip()
    expect(wrapper.vm.$data.isFlipped).to.be.true

    // should be debounced
    expect(wrapper.vm.$data.canFlip).to.be.false
    wrapper.vm.flip()
    expect(wrapper.vm.$data.isFlipped).to.be.true

    // wait for debounce time
    await setTimeout(() => {
      expect(wrapper.vm.$data.canFlip).to.be.true
      wrapper.vm.flip()
      expect(wrapper.vm.$data.canFlip).to.be.false
      expect(wrapper.vm.$data.isFlipped).to.be.false
    }, 300)
  })
})
