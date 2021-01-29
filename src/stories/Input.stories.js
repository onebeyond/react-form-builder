import React from 'react'
import Input from '../Fields/Input'

export default {
  title: 'Form/Input',
  component: Input
}

const Template = (args) => <Input {...args} />

export const Primary = Template.bind({})
Primary.args = { placeholder: 'placeholder', value: '' }
