import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import QuestionCheckbox from '../'

afterEach(cleanup)

const question = {
  name: 'terms_and_conditions',
  type: 'checkbox',
  isFullWidth: true,
  label:
    'I am over the age of 18, a United Kingdom resident and I have read and understood the [Terms and Conditions](https://www.google.es) of this promotion.',
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: true
  }
}

it('can checked/unchecked', () => {
  const { getByTestId } = render(
    <QuestionCheckbox
      question={question}
      useForm={{ errors: {}, register: () => {} }}
    />
  )

  const checkbox = getByTestId('question-checkbox')

  expect(checkbox.checked).toEqual(false)

  fireEvent.click(checkbox)

  expect(checkbox.checked).toEqual(true)
})

it('renders markdown', () => {
  const { getByText } = render(
    <QuestionCheckbox
      question={question}
      useForm={{ errors: {}, register: () => {} }}
    />
  )

  expect(getByText('I am over the age of 18,', { exact: false })).toBeTruthy()
})

it('shows an error message', () => {
  const { getByText } = render(
    <QuestionCheckbox
      question={question}
      useForm={{
        errors: {
          [question.name]: {
            type: 'required'
          }
        },
        register: () => {}
      }}
    />
  )

  expect(getByText(question.errorMessages.required)).toBeTruthy()
})

it('handles link', () => {
  const { getByRole } = render(
    <QuestionCheckbox
      question={question}
      useForm={{
        errors: {},
        register: () => {}
      }}
    />
  )

  const markDownLink = getByRole('link')
  expect(markDownLink.href).toBe('https://www.google.es/')
})
