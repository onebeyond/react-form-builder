import React from 'react'
import Button from '../Fields/Button'

export default {
  title: 'Form/Button',
  component: Button
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = { caption: 'Click me!' }
