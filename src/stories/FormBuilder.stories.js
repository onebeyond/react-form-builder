import React from 'react'
import FormBuilder from '../builder'

export default {
  title: 'Form/FormBuilder',
  component: FormBuilder
}

const Template = (args) => <FormBuilder {...args} />

export const Primary = Template.bind({})
Primary.args = {}
