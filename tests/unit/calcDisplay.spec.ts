import { shallowMount } from '@vue/test-utils'
import CalcDisplay from '@/components/CalcDisplay.vue'
const  assert = require('assert')

describe('CalcDisplay.vue', () => {
  it('renders input display', () => {
    const inputDisplay = '100'
    const wrapper = shallowMount(CalcDisplay, {
      props: { inputDisplay }
    })
    assert.equal(wrapper.text(), inputDisplay)
    // expect(wrapper.text()).toMatch(inputDisplay)
  })
  it('renders result display', () => {
    const resultDisplay = 100
    const wrapper = shallowMount(CalcDisplay, {
      props: { resultDisplay }
    })
    assert.equal(wrapper.text(), resultDisplay)
  })
})