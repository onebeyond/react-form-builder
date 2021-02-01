import React from 'react'
import ReactSelect from 'react-select'

export default {
  title: 'Form/Select',
  component: ReactSelect
}

const Template = (args) => <ReactSelect {...args} />

export const Primary = Template.bind({})
Primary.args = {
  options: [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
}
