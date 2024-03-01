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

import oldForm from './form-old.json'
import newForm from './form-new.json'
import styles from './styles.js'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const CountriesForm = () => {
  const [modalText, setModalText] = useState('')
  const [show, setShow] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState()

  function onLinkOpen(name) {
    setModalText(forms.contact.textToShow[name])
    setShow(true)
  }

  const onSubmitForm = async (data) => {
    console.log('Submitting the form...')

    // Simulate loading
    setLoading(true)
    await sleep(5000);
    setLoading(false)

    alert(
      `You have submitted your form correctly: ${'\n'} ${JSON.stringify(
        data,
        null,
        2
      )}`
    )
  }

  return (
    <div sx={styles.container}>
      <div sx={styles.formContainer}>
        <h1>
          {oldForm.title}
        </h1>
        <Modal
          title='test'
          onClose={() => setShow(false)}
          show={show}
          modalText={modalText}
        />
        <FormBuilder
          form={oldForm}
          onSubmit={onSubmitForm}
          isoCode='ES'
          language='es'
          onLinkOpen={onLinkOpen}
          isLoading={isLoading}
          formErrors={formErrors}
        />
      </div>
      <div sx={styles.formContainer}>
        <h1>
          {newForm.title}
        </h1>
        <Modal
          title='test'
          onClose={() => setShow(false)}
          show={show}
          modalText={modalText}
        />
        <FormBuilder
          form={newForm}
          onSubmit={onSubmitForm}
          isoCode='ES'
          language='es'
          onLinkOpen={onLinkOpen}
          isLoading={isLoading}
          formErrors={formErrors}
        />
      </div>
    </div>
  )
}

export default CountriesForm
