import React from 'react'
import { fireEvent, render, screen, renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useForm } from 'react-hook-form'

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
const { result } = renderHook(() => useForm())
const formMethods = result.current

test('label is displayed', () => {
  const { getByText } = render(
    <QuestionPhone question={question} useForm={formMethods} />
  )

  expect(getByText('phone label'))
})

test('placeholder is displayed', () => {
  const { getByPlaceholderText } = render(
    <QuestionPhone question={question} useForm={formMethods} />
  )

  expect(getByPlaceholderText('phone placeholder'))
})

test('error is displayed', () => {
  render(
    <QuestionPhone
      question={question}
      useForm={{
        ...formMethods,
        formState: {
          errors: {
            [question.name]: {
              type: 'required'
            }
          }
        }
      }}
    />
  )

  expect(screen.getByText(question.errorMessages.required))
})

test('phone can be filled', () => {
  const { getByTestId } = render(
    <QuestionPhone question={question} useForm={formMethods} />
  )
  const phoneComponent = getByTestId('question-phone')
  expect(phoneComponent.value).toBe('')
  fireEvent.change(phoneComponent, { target: { value: 555666777 } })
  expect(phoneComponent.value).toBe('555666777')
})

test('phone ES country is displayed', () => {
  const { getByLabelText } = render(
    <QuestionPhone question={question} isoCode='ES' useForm={formMethods} />
  )
  const countryComponent = getByLabelText('Phone number country')
  expect(countryComponent.value).toBe('ES')
  fireEvent.change(countryComponent, { target: { value: 'FR' } })
  expect(countryComponent.value).toBe('FR')
})

test('default country code is displayed', () => {
  const newQuestion = { ...question, defaultCountry: 'fr' }
  const { getByLabelText } = render(
    <QuestionPhone question={newQuestion} useForm={formMethods} />
  )
  const countryComponent = getByLabelText('Phone number country')
  expect(countryComponent.value).toBe('FR')
  fireEvent.change(countryComponent, { target: { value: 'GB' } })
  expect(countryComponent.value).toBe('GB')
})

test('pattern error is displayed', () => {
  render(
    <QuestionPhone
      question={question}
      useForm={{
        ...formMethods,
        formState: {
          errors: {
            [question.name]: {
              type: 'pattern'
            }
          }
        }
      }}
    />
  )

  expect(screen.getByText('This is not the right pattern'))
})

test('country code is visible', () => {
  const result = render(
    <QuestionPhone
      question={{ ...question, defaultCountry: 'GB', international: true }}
      useForm={formMethods}
    />
  )
  expect(
    result.container.querySelector('input[type="tel"]').getAttribute('value')
  ).toBe('+44')
})

test('default value is displayed', () => {
  const defaultValue = '555666777'
  const { getByTestId } = render(
    <QuestionPhone
      question={{ ...question, defaultValue }}
      useForm={formMethods}
    />
  )
  const phoneComponent = getByTestId('question-phone')
  expect(phoneComponent.getAttribute('value')).toBe(defaultValue)
})

test('default value can be changed', () => {
  const defaultValue = '555666777'
  const changedValue = '777666555'
  const formatedChangedValue = '+7 776 665 55'
  const { getByTestId } = render(
    <QuestionPhone
      question={{ ...question, defaultValue }}
      useForm={formMethods}
    />
  )
  const phoneComponent = getByTestId('question-phone')
  expect(phoneComponent.value).toBe(defaultValue)
  fireEvent.change(phoneComponent, { target: { value: changedValue } })
  expect(phoneComponent.value).toBe(formatedChangedValue)
})
