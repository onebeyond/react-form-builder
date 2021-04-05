import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import QuestionCheckbox from '../'

afterEach(cleanup)

const question = {
  name: 'terms_and_conditions',
  type: 'checkbox',
  isFullWidth: true,
  defaultChecked: true,
  label:
    'I am over the age of 18, a United Kingdom resident and I have read and understood the [Terms and Conditions](https://www.google.es) of this promotion.',
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: true
  }
}

test('can checked/unchecked', () => {
  const { getByTestId } = render(
    <QuestionCheckbox
      question={question}
      useForm={{ errors: {}, register: () => {} }}
    />
  )

  const checkbox = getByTestId('question-checkbox')

  expect(checkbox.checked).toEqual(true)

  fireEvent.click(checkbox)

  expect(checkbox.checked).toEqual(false)
})

test('default checked true', () => {
  const { getByTestId } = render(
    <QuestionCheckbox
      question={question}
      useForm={{ errors: {}, register: () => {} }}
    />
  )
  const checkbox = getByTestId('question-checkbox')

  expect(checkbox.checked).toEqual(true)
})

test('default checked false', () => {
  question.defaultChecked = false

  const { getByTestId } = render(
    <QuestionCheckbox
      question={question}
      useForm={{ errors: {}, register: () => {} }}
    />
  )
  const checkbox = getByTestId('question-checkbox')

  expect(checkbox.checked).toEqual(false)
})

test('renders markdown', () => {
  const { getByText } = render(
    <QuestionCheckbox
      question={question}
      useForm={{ errors: {}, register: () => {} }}
    />
  )

  expect(getByText('I am over the age of 18,', { exact: false })).toBeTruthy()
})

test('shows an error message', () => {
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

test('handles default markdown link', () => {
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
  expect(markDownLink.target).toBe('_blank')
})

test('handles custom markdown link callback', () => {
  const onLinkOpen = jest.fn()
  const { getByRole } = render(
    <QuestionCheckbox
      question={{
        ...question,
        label:
          'I am over the age of 18, a United Kingdom resident and I have read and understood the [Terms and Conditions](#) of this promotion.'
      }}
      onLinkOpen={onLinkOpen}
      useForm={{
        errors: {},
        register: () => {}
      }}
    />
  )
  const markDownLink = getByRole('link')
  expect(markDownLink.href).toContain('#')
  fireEvent.click(markDownLink)
  expect(onLinkOpen).toBeCalledWith(question.name)
})
