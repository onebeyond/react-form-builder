import React from 'react'
import Label from '../Fields/Label'

export default {
  title: 'Form/Label',
  component: Label
}

const Template = (args) => <Label {...args} />

export const Primary = Template.bind({})
Primary.args = { children: 'Text' }
