import React from 'react'
import { cleanup, fireEvent, render, renderHook } from '@testing-library/react'
import QuestionMultipleCheckboxes from '../'
import { useForm } from 'react-hook-form'

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
  defaultCheckedValues: ['three'],
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
const { result } = renderHook(() => useForm())
const formMethods = result.current

const customRender = () =>
  render(
    <QuestionMultipleCheckboxes question={question} useForm={formMethods} />
  )

test('check if component is rendered', () => {
  expect(customRender()).toBeTruthy()
})

test('check if label exists', () => {
  customRender().getByText(question.label)
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

  expect(getByText(question.errorMessages.required)).toBeTruthy()
})
test('shows a max option error message', () => {
  const { getByText } = render(
    <QuestionMultipleCheckboxes
      question={question}
      useForm={{
        ...formMethods,
        formState: {
          errors: {
            [question.name]: {
              type: 'maximumLen'
            }
          }
        }
      }}
    />
  )

  expect(getByText(question.errorMessages.maximumLen)).toBeTruthy()
})
test('shows a minimun option error message', () => {
  const { getByText } = render(
    <QuestionMultipleCheckboxes
      question={question}
      useForm={{
        ...formMethods,
        formState: {
          errors: {
            [question.name]: {
              type: 'minimumLen'
            }
          }
        }
      }}
    />
  )

  expect(getByText(question.errorMessages.minimumLen)).toBeTruthy()
})
