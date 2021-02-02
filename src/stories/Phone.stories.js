import React from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default {
  title: 'Form/Phone',
  component: PhoneInput,
  argTypes: {
    onChange: {
      action: 'onChange'
    }
  }
}

const Template = (args) => <PhoneInput {...args} />

export const Primary = Template.bind({})
Primary.args = {
  placeholder: 'Phone',
  defaultCountry: 'GB'
}
