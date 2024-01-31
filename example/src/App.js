/* eslint-disable */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useState } from 'react'
import {
  Label,
  Modal,
  FormBuilder
} from 'react-form-builder'

import forms from './forms.json'
import styles from './styles.js'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-phone-number-input/style.css'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const App = () => {
  const [modalText, setModalText] = useState('')
  const [show, setShow] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState()

  function onLinkOpen(name) {
    setModalText(forms.contact.textToShow[name])
    setShow(true)
  }

  const onSubmitForm = async (data) => {
    if (data.password !== data.confirmpassword) {
      setFormErrors([{ field: 'confirmpassword', type: 'doesNotMatch' }])
    } else {
      console.log('Submitting the form')
      // Simulate loading
      setLoading(true)
      await sleep(5000);
      setLoading(false)

      alert(
        `You have submitted your form correctly Data: ${'\n'} ${JSON.stringify(
          data,
          null,
          2
        )}`
      )
    }
  }

  return (
    <div sx={styles.container}>
      <Label>Example of form builder</Label>
      <Modal
        title='test'
        onClose={() => setShow(false)}
        show={show}
        modalText={modalText}
      />
      <FormBuilder
        idForm={forms.survey.id}
        form={forms.survey}
        onSubmit={onSubmitForm}
        isoCode='ES'
        language='en'
        onLinkOpen={onLinkOpen}
        isLoading={isLoading}
        formErrors={formErrors}
      />
    </div>
  )
}

export default App
