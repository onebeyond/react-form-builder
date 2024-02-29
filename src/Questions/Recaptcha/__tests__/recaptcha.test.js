import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import QuestionRecaptcha from '..'

const formDataValues = {}
const recaptchaRef = React.createRef(null)
const onSubmitForm = () => {}
const question = {
  name: 'recaptcha',
  type: 'recaptcha',
  recaptchaKey: 'random'
}

test('renders a reCAPTCHA', () => {
  const { getByTestId } = render(
    <QuestionRecaptcha
      ref={recaptchaRef}
      formDataValues={formDataValues}
      onSubmitForm={onSubmitForm}
      question={question}
    />
  )

  expect(getByTestId('recaptcha-test')).toBeTruthy()
})
