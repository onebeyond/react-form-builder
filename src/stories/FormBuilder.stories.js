import React from 'react'
import FormBuilder from '../builder'
import contact from '../forms/forms.json'
export default {
  title: 'Form/FormBuilder',
  component: FormBuilder
}

const Template = (args) => <FormBuilder {...args} />

export const Primary = Template.bind({})
Primary.args = {
  form: contact,
  isoCode: 'GB',
  isMobile: false
}
