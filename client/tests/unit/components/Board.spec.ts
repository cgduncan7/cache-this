import { expect } from 'chai'
import { shallowMount  } from '@vue/test-utils'
import Board from '@/components/Board.vue'

describe('Board.vue', () => {
  it('should be created', () => {
    const wrapper = shallowMount(
      Board,
      {
        propsData: {
          cardValues: []
        }
      }
    )

    expect(wrapper.exists()).to.be.true
  })

  it('should render a board', () => {
    const wrapper = shallowMount(
      Board,
      {
        propsData: {
          cardValues: []
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
          cardValues: [1,2,3,4]
        }
      }
    )

    expect(wrapper.vm.$children.length).to.equal(4)
  })
})