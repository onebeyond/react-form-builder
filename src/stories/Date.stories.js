import React from 'react'
import Date from '../Fields/Date'
import { useForm } from 'react-hook-form'

export default {
  title: 'Form/Date',
  component: Date
}

const Template = (args) => {
  const { register, setValue } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  return (
    <Date
      register={register}
      setValue={setValue}
      name='Date'
      registerConfig={{}}
      {...args}
    />
  )
}

export const Primary = Template.bind({})
Primary.args = {
  placeholder: '',
  dateFormat: 'dd-MM-yyyy',
  isMobile: false,
  isBirthDate: false
}
