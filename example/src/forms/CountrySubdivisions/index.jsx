/* eslint-disable */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useState } from 'react'
import {
  Modal,
  FormBuilder
} from '@onebeyond/react-form-builder'

import form from './form.json'
import styles from './styles.js'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const CountrySubdivisionsForm = () => {
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
      <h1>
        {form.title}
      </h1>
      <Modal
        title='test'
        onClose={() => setShow(false)}
        show={show}
        modalText={modalText}
      />
      <FormBuilder
        form={form}
        onSubmit={onSubmitForm}
        isoCode='ES'
        language='es'
        onLinkOpen={onLinkOpen}
        isLoading={isLoading}
        formErrors={formErrors}
      />
    </div>
  )
}

export default CountrySubdivisionsForm
