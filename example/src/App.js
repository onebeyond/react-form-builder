import React from 'react'

import {
  Button,
  Input,
  Label,
  Checkbox,
  Select,
  Radio,
  Phone,
  FormBuilder
} from 'react-form-builder'

import forms from './forms.json'
import { useForm } from 'react-hook-form'

const App = () => {

  const {
    register,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
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
      <Button caption='Button example'></Button>
      <Input></Input>
      <Phone
        defaultCountry='GB'
        style={{}}
        register={register}
        setValue={setValue}
        setError={setError}
        clearErrors={clearErrors}
        placeholder='Phone'
      />
      <Label>An important title field here *</Label>
      <Label>
        <Checkbox />
        Select an option
      </Label>
      <Select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </Select>
      <Label>
        <Radio name='dark-mode' value='true' defaultChecked={true} />
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
      ></FormBuilder>
    </>
  )
}

export default App
