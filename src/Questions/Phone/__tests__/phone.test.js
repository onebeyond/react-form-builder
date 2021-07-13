import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import QuestionPhone from '..'

const question = {
  name: 'phoneName',
  type: 'phone',
  label: 'phone label',
  placeholder: 'phone placeholder',
  errorMessages: {
    required: 'This field is required',
    pattern: 'This is not the right pattern'
  },
  registerConfig: {
    required: true
  }
}

test('label is displayed', () => {
  const { getByText } = render(
    <QuestionPhone
      question={question}
      useForm={{ errors: {}, register: () => {}, setValue: jest.fn() }}
    />
  )

  expect(getByText('phone label'))
})

test('placeholder is displayed', () => {
  const { getByPlaceholderText } = render(
    <QuestionPhone
      question={question}
      useForm={{ errors: {}, register: () => {}, setValue: jest.fn() }}
    />
  )

  expect(getByPlaceholderText('phone placeholder'))
})

test('error is displayed', () => {
  render(
    <QuestionPhone
      question={question}
      useForm={{
        errors: {
          [question.name]: {
            type: 'required'
          }
        },
        register: () => {},
        setValue: jest.fn()
      }}
    />
  )

  expect(screen.getByText(question.errorMessages.required))
})

test('phone can be filled', () => {
  const { getByTestId } = render(
    <QuestionPhone
      question={question}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn()
      }}
    />
  )
  const phoneComponent = getByTestId('question-phone')
  expect(phoneComponent.value).toBe('')
  fireEvent.change(phoneComponent, { target: { value: 555666777 } })
  expect(phoneComponent.value).toBe('555666777')
})

test('phone ES country is displayed', () => {
  const { getByLabelText } = render(
    <QuestionPhone
      question={question}
      isoCode='ES'
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn()
      }}
    />
  )
  const countryComponent = getByLabelText('Phone number country')
  expect(countryComponent.value).toBe('ES')
  fireEvent.change(countryComponent, { target: { value: 'FR' } })
  expect(countryComponent.value).toBe('FR')
})

test('pattern error is displayed', () => {
  render(
    <QuestionPhone
      question={question}
      useForm={{
        errors: {
          [question.name]: {
            type: 'pattern'
          }
        },
        register: () => {},
        setValue: jest.fn()
      }}
    />
  )

  expect(screen.getByText('This is not the right pattern'))
})
