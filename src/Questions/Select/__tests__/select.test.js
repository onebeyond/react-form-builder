import React from 'react'
import { render, renderHook } from '@testing-library/react'
import selectEvent from 'react-select-event'
import { useForm } from 'react-hook-form'
import QuestionSelect from '../'

import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

const question = {
  name: 'gender',
  type: 'select',
  label: 'What is your gender?',
  placeholder: 'Please make a selection',
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: true
  },
  config: {
    options: [
      {
        label: 'Female',
        value: 'female'
      },
      {
        label: 'Male',
        value: 'male'
      },
      {
        label: 'Prefer not to say',
        value: 'prefer_not_to_say'
      }
    ]
  }
}
const { result } = renderHook(() => useForm())
const formMethods = result.current

const customRender = (options) =>
  render(
    <QuestionSelect
      question={question}
      useForm={{ ...formMethods, ...options }}
    />
  )

test('check if component is rendered', () => {
  expect(customRender()).toBeTruthy()
})

test('check if placeholder exists', () => {
  customRender().getByText(question.placeholder)
})

test('check if label exists', () => {
  customRender().getByLabelText(question.label)
})

test('check if error exists', () => {
  customRender({
    formState: {
      errors: {
        [question.name]: {
          type: 'required'
        }
      }
    }
  }).getByText(question.errorMessages.required)
})

test('check if option labels exist', () => {
  const { queryByText, getByText, getByLabelText } = customRender()

  question.config.options.forEach((option) => {
    expect(queryByText(option.label)).toBeNull()
  })

  const select = getByLabelText(question.label)
  selectEvent.openMenu(select)

  question.config.options.forEach((option) => {
    getByText(option.label)
  })
})
