import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import QuestionRecaptcha from '..'

const formDataValues = {}
const recaptchaRef = React.createRef(null)
const onSubmitForm = () => {}

test('renders a reCAPTCHA', () => {
  const { getByTestId } = render(
    <QuestionRecaptcha
      recaptchaRef={recaptchaRef}
      formDataValues={formDataValues}
      onSubmitForm={onSubmitForm}
    />
  )

  expect(getByTestId('recaptcha-test')).toBeTruthy()
})
