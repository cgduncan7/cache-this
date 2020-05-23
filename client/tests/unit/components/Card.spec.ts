import { expect } from 'chai'
import { shallowMount  } from '@vue/test-utils'
import Card from '@/components/Card.vue'

describe('Card.vue', () => {
  it('is created not flipped with ? as value', () => {
    const value = '42'
    const wrapper = shallowMount(
      Card,
      { propsData: { value } },
    )

    expect(wrapper.vm.$data.canFlip).to.be.true
    expect(wrapper.vm.$data.isFlipped).to.be.false

    expect(wrapper.text()).to.include('?')
    expect(wrapper.classes()).to.contain('card-container')
  })

  it('is created not flipped but can be flipped', () => {
    const value = '42'
    const wrapper = shallowMount(
      Card,
      { propsData: { value } },
    )

    // flip card
    wrapper.vm.flip()
    expect(wrapper.vm.$data.canFlip).to.be.false
    expect(wrapper.vm.$data.isFlipped).to.be.true
  })

  it('is able to flip and reveal number', async () => {
    const value = '42'
    const wrapper = shallowMount(
      Card,
      { propsData: { value } },
    )

    // flip card
    wrapper.vm.flip()

    // wait for classes to update
    await setTimeout(() => {
      expect(wrapper.classes()).to.contain('flipped')
      expect(wrapper.text()).to.include(value)
    }, 50)
  })

  it('is able to flip and must wait 250ms for flip again', async () => {
    const value = '42'
    const wrapper = shallowMount(
      Card,
      { propsData: { value } },
    )

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
