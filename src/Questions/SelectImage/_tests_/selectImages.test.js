import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import QuestionSelectImage from '../'

afterEach(cleanup)

const question = {
  label: 'Select your image',
  type: 'select_images',
  errorMessages: {
    required: 'This field is required',
    maximumLen: 'Maximum choises exceded'
  },
  registerConfig: {
    required: true,
    maximumLen: '1'
  },
  name: 'select_images_example',
  config: {
    options: [
      {
        label: 'Option 1',
        value: 'option_1',
        src: 'https://placehold.jp/120x120.png'
      },
      {
        label: 'Option 2',
        value: 'option_2',
        src: 'https://placehold.jp/120x120.png'
      },
      {
        label: 'Option 3',
        value: 'option_3',
        src: 'https://placehold.jp/120x120.png'
      },
      {
        label: 'Option 4',
        value: 'option_4',
        src: 'https://placehold.jp/120x120.png'
      },
      {
        label: 'Option 5',
        value: 'option_5',
        src: 'https://placehold.jp/120x120.png'
      }
    ]
  }
}

const customRender = () =>
  render(
    <QuestionSelectImage
      question={question}
      useForm={{
        errors: {},
        getValues: () => {
          return { select_images_example: ['option_1'] }
        },
        register: jest.fn(),
        setValue: jest.fn(),
        watch: jest.fn()
      }}
    />
  )

test('check if component is rendered', () => {
  expect(customRender()).toBeTruthy()
})

test('check if label exists', () => {
  customRender().getByText(question.label)
})

test('can first option be checked/unchecked', () => {
  const selectImageCheckboxes = customRender().getAllByTestId(
    'question-singleCheckbox'
  )

  expect(selectImageCheckboxes[0].checked).toEqual(false)
  fireEvent.click(selectImageCheckboxes[0])
  expect(selectImageCheckboxes[0].checked).toEqual(true)
})

test('all options are rendered', () => {
  const selectImageCheckboxes = customRender().getAllByTestId(
    'question-singleCheckbox'
  )

  expect(selectImageCheckboxes.length).toEqual(5)
})

test('shows an error message', () => {
  const { getByText } = render(
    <QuestionSelectImage
      question={question}
      useForm={{
        errors: {
          [question.name]: {
            type: 'required'
          }
        },
        getValues: () => {
          return { select_images_example: ['option_1'] }
        },
        register: jest.fn(),
        setValue: jest.fn(),
        watch: jest.fn()
      }}
    />
  )

  expect(getByText(question.errorMessages.required)).toBeTruthy()
})
