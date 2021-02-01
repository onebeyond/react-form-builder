import React from 'react'
import Radio from '../Fields/Radio'

export default {
  title: 'Form/Radio',
  component: Radio
}

const Template = (args) => <Radio {...args} />

export const Primary = Template.bind({})
Primary.args = { checked: false }
