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

import 'react-datepicker/dist/react-datepicker.css'
import 'react-phone-number-input/style.css'

const App = () => {
  const styles = {
    container: {
      padding: '30px 30px',
    },
    fullWidth: {
      gridColumnStart: '1',
      gridColumnEnd: '3'
    },
    selectOption: {
      background: 'bg',
      color: 'black'
    },
    markDown: {
      fontFamily: 'regular',
      width: ['90%', '95%', '95%'],
      p: {
        margin: 0
      }
    }
  }

  const [modalText, setModalText] = useState('')
  const [show, setShow] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState()

  function onLinkOpen(name) {
    setModalText(forms.contact.textToShow[name])
    setShow(true)
  }

  const onSubmitForm = (data) => {
    if (data.password !== data.confirmpassword) {
      setFormErrors([{ field: 'confirmpassword', type: 'doesNotMatch' }])
    } else {
      !isLoading &&
        alert(
          `You have submitted your form correctly Data: ${'\n'} ${JSON.stringify(
            data,
            null,
            2
          )}`
        )
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
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
