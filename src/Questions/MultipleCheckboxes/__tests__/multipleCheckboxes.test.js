import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import QuestionMultipleCheckboxes from '../'

afterEach(cleanup)

const question = {
  label: 'MultipleChoice',
  type: 'multiple_multipleCheckboxes',
  qId: '81b20f0d-6f31-4ab6-b0a5-eca42cbd965b',
  errorMessages: {
    required: 'This field is required',
    maximumLen: 'Maximum choises exceded',
    minimumLen: 'Minimum choises required'
  },
  registerConfig: {
    required: true,
    maximumLen: '2',
    minimumLen: '2'
  },
  placeholder: 'Multip',
  name: 'multip',
  config: {
    options: [
      {
        label: 'one',
        value: 'one'
      },
      {
        label: 'two',
        value: 'two'
      },
      {
        label: 'three',
        value: 'three'
      }
    ]
  }
}

const customRender = (options) =>
  render(
    <QuestionMultipleCheckboxes
      question={question}
      useForm={{
        errors: {},
        register: jest.fn(),
        setValue: jest.fn(),
        unregister: jest.fn(),
        trigger: jest.fn(),
        ...options
      }}
    />
  )

test('check if component is rendered', () => {
  expect(customRender()).toBeTruthy()
})

test('check if label exists', () => {
  customRender().getByLabelText(question.label)
})

test('can first option be checked/unchecked', () => {
  const multipleCheckboxes = customRender().getAllByTestId(
    'question-singleCheckbox'
  )

  expect(multipleCheckboxes[0].checked).toEqual(false)
  fireEvent.click(multipleCheckboxes[0])
  expect(multipleCheckboxes[0].checked).toEqual(true)
})

test('all options are rendered', () => {
  const multipleCheckboxes = customRender().getAllByTestId(
    'question-singleCheckbox'
  )

  expect(multipleCheckboxes.length).toEqual(3)
})

test('shows an error message', () => {
  const { getByText } = render(
    <QuestionMultipleCheckboxes
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
