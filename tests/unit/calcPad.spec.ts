import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import CalcPad from '@/components/CalcPad.vue'

describe('CalcDisplay.vue', () => {
  let component: any;

  beforeEach(() => {
    component = shallowMount(CalcPad)
  })

  it('renders the the buttons', () => {
    expect(component.find('button').text()).to.contain('AC')
  })
})
