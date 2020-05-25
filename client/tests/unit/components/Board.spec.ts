import { expect } from 'chai'
import { mount, shallowMount } from '@vue/test-utils'
import Board from '@/components/Board.vue'

describe('Board.vue', () => {
  it('should be created', () => {
    const wrapper = shallowMount(
      Board,
      {
        propsData: {
          cardValues: [],
          solution: []
        }
      }
    )

    expect(wrapper.exists()).to.be.true
    expect(wrapper.vm.$data.solutionIndex).to.equal(0)
    expect(wrapper.vm.$data.solved).to.be.false
    expect(wrapper.vm.$data.started).to.be.false
  })

  it('should render a board', () => {
    const wrapper = shallowMount(
      Board,
      {
        propsData: {
          cardValues: [],
          solution: []
        }
      }
    )

    expect(wrapper.find('#board').element.id).to.equal('board')
  })

  it('should create X cards', () => {
    const wrapper = shallowMount(
      Board,
      {
        propsData: {
          cardValues: [1,2,3,4],
          solution: [1,2,3,4]
        }
      }
    )

    expect(wrapper.vm.$children.length).to.equal(4)
  })

  it('should flip all cards on start press', () => {
    const wrapper = mount(
      Board,
      {
        propsData: {
          cardValues: [1,2,3,4],
          solution: [1,2,3,4]
        }
      }
    )

    wrapper.vm.start()

    wrapper.vm.$children.forEach((v) => {
      expect(v.$data.isFlipped).to.be.false
      expect(v.$data.canFlip).to.be.true
    })
  })

  it('should correctly step through solution', () => {
    const wrapper = shallowMount(
      Board,
      {
        propsData: {
          cardValues: [1,2,3,4],
          solution: [1,2,3,4]
        }
      }
    )

    expect(wrapper.vm.$data.solutionIndex).to.equal(0)
    expect(wrapper.vm.isCorrect(1)).to.be.true
    expect(wrapper.vm.$data.solutionIndex).to.equal(1)
    expect(wrapper.vm.isCorrect(3)).to.be.false
    expect(wrapper.vm.isCorrect(2)).to.be.true
    expect(wrapper.vm.$data.solutionIndex).to.equal(2)
    expect(wrapper.vm.isCorrect(3)).to.be.true
    expect(wrapper.vm.$data.solutionIndex).to.equal(3)
    expect(wrapper.vm.isCorrect(4)).to.be.true
    expect(wrapper.vm.$data.solutionIndex).to.equal(4)
    expect(wrapper.vm.$data.solved).to.be.true
  })
})