import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import CalcHeader from '@/components/CalcHeader.vue'

describe('CalcHeader.vue', () => {
  it('should change highlight on click', async () => {
    const wrapper = shallowMount(CalcHeader)
    const active = wrapper.find('.highlight')
    const converter = wrapper.find('#converter')

    expect(active.text()).to.equal('Calculator')
    await converter.trigger('click')

    expect(wrapper.find('.highlight').text()).to.equal('Converter')
  })
})