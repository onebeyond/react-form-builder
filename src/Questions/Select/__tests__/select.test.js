import React from 'react'
import { render } from '@testing-library/react'
import QuestionSelect from '../'
import selectEvent from 'react-select-event'

import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

const question = {
  name: '$Gender',
  type: 'select',
  placeholder: 'Please make a selection',
  label: 'What is your gender?',
  isFullWidth: true,
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: true
  },
  config: {
    options: [
      {
        value: 'female',
        label: 'Female'
      },
      {
        value: 'male',
        label: 'Male'
      },
      {
        value: 'prefer_not_say',
        label: 'Prefer not to say'
      }
    ]
  }
}

test('Select label is displayed', () => {
  const { getByLabelText } = render(
    <QuestionSelect
      question={question}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn()
      }}
    />
  )

  expect(getByLabelText('What is your gender?'))
})

test('Select placeholder is displayed', () => {
  const { getByText } = render(
    <QuestionSelect
      question={question}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn()
      }}
    />
  )

  expect(getByText('Please make a selection'))
})

test('Error required is displayed', () => {
  const { getByText } = render(
    <QuestionSelect
      question={question}
      useForm={{
        errors: { [question.name]: { type: 'required' } },
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn()
      }}
    />
  )

  expect(getByText('This field is required'))
})

test('Options are rendered', async () => {
  const { getByText } = render(
    <QuestionSelect
      question={question}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn()
      }}
    />
  )
  const select = getByText('Please make a selection')
  await selectEvent.openMenu(select)
  expect(getByText('Female'))
  expect(getByText('Male'))
  expect(getByText('Prefer not to say'))
})

test('Options can be selected', async () => {
  const { getByText } = render(
    <QuestionSelect
      question={question}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn()
      }}
    />
  )
  const select = getByText('Please make a selection')
  await selectEvent.select(select, ['Male'])
  expect(getByText('Male'))
})
