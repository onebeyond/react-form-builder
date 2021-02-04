import React from 'react'
import Phone from '../Fields/Phone'
import 'react-phone-number-input/style.css'

export default {
  title: 'Form/Phone',
  component: Phone,
  argTypes: {
    onChange: {
      action: 'onChange'
    }
  }
}

const Template = (args) => (
  <Phone
    register={() => {}}
    setValue={() => {}}
    setError={() => {}}
    clearErrors={() => {}}
    {...args}
  />
)

export const Primary = Template.bind({})
Primary.args = {
  placeholder: 'Phone',
  defaultCountry: 'GB'
}
