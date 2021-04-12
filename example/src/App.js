import React, { useEffect, useState } from 'react'
/** @jsx jsx */
import { jsx, Link } from 'theme-ui'
import ReactMarkdown from 'react-markdown'

import {
  Button,
  Input,
  Label,
  Checkbox,
  Radio,
  Phone,
  Date,
  Modal,
  ErrorMessage,
  FormBuilder
} from 'react-form-builder'

import forms from './forms.json'
import { useForm } from 'react-hook-form'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-phone-number-input/style.css'

const App = () => {
  const styles = {
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

  const [privacyAllow, setPrivacyAllow] = useState(false)
  const [modalText, setModalText] = useState('')
  const [show, setShow] = useState(false)
  function onLinkOpen(name) {
    setModalText(forms.contact.textToShow[name])
    setShow(true)
  }
  const CustomCheckbox = (question, useForm) => {
    return (
      <div sx={{ ...(question.isFullWidth && styles.fullWidth) }}>
        <Modal
          title={question.name}
          onClose={() => setShow(false)}
          show={show}
          modalText='this a  modal example *markdown* **text** '
        />

        <div sx={{}}>
          <div sx={styles.centerStyle} key={question.name}>
            <Label sx={styles.centerStyle}>
              <Checkbox
                sx={styles.checkboxMinWidth}
                name={question.name}
                test='test'
                ref={useForm.register(question.name, question.registerConfig)}
              />
              <ReactMarkdown
                sx={styles.markDown}
                source={question.label}
                renderers={{
                  link: ({ href, children }) => {
                    return (
                      <Link
                        href={
                          children[0].props.children.includes('privacy')
                            ? '#'
                            : '#'
                        }
                      >
                        {children} esto es el children: {children[0]}
                      </Link>
                    )
                  }
                }}
              />
            </Label>
            {useForm?.errors[question.name] &&
              useForm?.errors[question.name]?.type === 'required' && (
                <ErrorMessage
                  message={
                    question?.errorMessages && question?.errorMessages?.required
                  }
                />
              )}
          </div>
        </div>
      </div>
    )
  }

  const ModalCheckbox = () => {
    const [show, setShow] = useState(false)
    function onLinkOpen(name) {
      console.log('tuputamadre')
      setShow(true)
    }
    return (
      <React.Fragment>
        <Checkbox
          question={forms.question}
          onLinkOpen={onLinkOpen}
          useForm={{ errors: {}, register: () => {} }}
        />
      </React.Fragment>
    )
  }

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
      {/* <Button caption='Button example' />
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
      </Label> */}
      <Label>Example of form builder</Label>
      <Modal
        title='test'
        onClose={() => setShow(false)}
        show={show}
        modalText={modalText}
      />
      <FormBuilder
        idForm={forms.contact.id}
        form={forms.contact}
        onSubmit={onSubmitForm}
        isoCode='ES'
        onLinkOpen={onLinkOpen}
      />
      <ModalCheckbox />
    </>
  )
}

export default App
