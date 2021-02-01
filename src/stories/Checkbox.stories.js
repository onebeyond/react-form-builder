import React from 'react'
import Checkbox from '../Fields/Checkbox'

export default {
  title: 'Form/Checkbox',
  component: Checkbox
}

const Template = (args) => <Checkbox {...args} />

export const Primary = Template.bind({})
Primary.args = { checked: true }
