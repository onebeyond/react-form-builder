import React from 'react'
import Select from '../Fields/Select'

export default {
  title: 'Form/Select',
  component: Select
}

const Template = (args) => (
  <Select {...args}>
    {args.options &&
      args.options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )
      })}
  </Select>
)

export const Primary = Template.bind({})
const options = [
  { key: '1', value: 'Option1', label: 'Option 1' },
  { key: '2', value: 'Option2', label: 'Option 2' },
  { key: '3', value: 'Option3', label: 'Option 3' },
  { key: '4', value: 'Option4', label: 'Option 4' }
]
Primary.args = { options }
