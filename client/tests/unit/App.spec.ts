import { expect } from 'chai'
import { shallowMount  } from '@vue/test-utils'
import App from '@/App.vue'
import GameMode from '@/types/GameMode'

describe('App.vue', () => {
  it('should be created', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.exists()).to.be.true
    expect(wrapper.vm.$data.gameMode).to.equal(GameMode.None)
    expect(wrapper.vm.$data.cardValues.length).to.equal(0)
    expect(wrapper.vm.$data.solution.length).to.equal(0)
  })

  it('should render an app', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.find('#app').element.id).to.equal('app')
  })

  it('should render mode-select if no gameMode is selected', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.find('#mode-select')).to.exist
    expect(wrapper.vm.$data.gameMode).to.equal(GameMode.None)
  })

  it('should set gameMode to Easy on easy select', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.find('button.easy')).to.exist
    wrapper.find('button.easy').trigger('click')

    expect(wrapper.vm.$data.gameMode).to.equal(GameMode.Easy)
  })

  it('should set gameMode to Medium on medium select', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.find('button.medium')).to.exist
    wrapper.find('button.medium').trigger('click')

    expect(wrapper.vm.$data.gameMode).to.equal(GameMode.Medium)
  })

  it('should set gameMode to Hard on hard select', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.find('button.hard')).to.exist
    wrapper.find('button.hard').trigger('click')

    expect(wrapper.vm.$data.gameMode).to.equal(GameMode.Hard)
  })
})