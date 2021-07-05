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
screen.debug()

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
  fireEvent.change(phoneComponent, { target: { value: 'phone testing' } })
  expect(phoneComponent.value).toBe('phone testing')
})

test('default value is displayed', () => {
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
  fireEvent.change(phoneComponent, { target: { value: 'phone testing' } })
  expect(phoneComponent.value).toBe('phone testing')
})

test('patern error is displayed', () => {
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
