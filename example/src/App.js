import React from 'react'

import {
  Button,
  Input,
  Label,
  Checkbox,
  Radio,
  Phone,
  Date,
  FormBuilder
} from 'react-form-builder'

import forms from './forms.json'
import { useForm } from 'react-hook-form'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-phone-number-input/style.css'

const App = () => {
  const { register, setValue, setError, clearErrors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const onSubmitForm = (data) => {
    alert(
      `You have submitted your form correctly Data: ${'\n'} ${JSON.stringify(
        data,
        null,
        2
      )}`
    )
  }

  return (
    <>
      <Button caption='Button example' />
      <Input />
      <Phone
        defaultCountry='GB'
        style={{}}
        register={register}
        setValue={setValue}
        setError={setError}
        clearErrors={clearErrors}
        placeholder='Phone'
      />
      <Date
        register={register}
        setValue={setValue}
        name='Date'
        registerConfig={{}}
        placeholder=''
        dateFormat='dd-MM-yyyy'
        isMobile={false}
        isBirthDate={false}
      />
      <Label>An important title field here *</Label>
      <Label>
        <Checkbox />
        Select an option
      </Label>
      <Label>
        <Radio name='dark-mode' value='true' defaultChecked />
        Dark Mode
      </Label>
      <Label>
        <Radio name='dark-mode' value='false' />
        Light Mode
      </Label>
      <Label>Example of form builder</Label>
      <FormBuilder
        idForm={forms.contact.id}
        form={forms.contact}
        onSubmit={onSubmitForm}
      />
    </>
  )
}

export default App
