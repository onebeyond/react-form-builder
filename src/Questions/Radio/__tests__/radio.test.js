import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import QuestionRadio from '../'

const question = {
  name: 'alpinef1_seasonlaunch_2021_opt_in_alpineracing',
  label: 'question text to display',
  type: 'radio',
  options: [
    {
      value: true,
      label: 'YES'
    },
    {
      value: false,
      label: 'NOP'
    }
  ],
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: true
  }
}

test('markdown is displayed', () => {
  const { getByText } = render(
    <QuestionRadio
      question={question}
      useForm={{ errors: {}, register: () => {} }}
    />
  )

  expect(getByText('question text to display'))
})

test('radio labels are displayed', () => {
  const { getByLabelText } = render(
    <QuestionRadio
      question={question}
      useForm={{ errors: {}, register: () => {} }}
    />
  )
  expect(getByLabelText('YES'))
  expect(getByLabelText('NOP'))
})

test('radio values are assigned', () => {
  const { getByLabelText } = render(
    <QuestionRadio
      question={question}
      useForm={{ errors: {}, register: () => {} }}
    />
  )
  expect(getByLabelText('YES').value).toBe('true')
  expect(getByLabelText('NOP').value).toBe('false')
})

test('error is displayed', () => {
  const { getByText } = render(
    <QuestionRadio
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
  expect(getByText('This field is required'))
})

test('radio can be selected', () => {
  const { getByLabelText } = render(
    <QuestionRadio
      question={question}
      useForm={{ errors: {}, register: () => {} }}
    />
  )
  fireEvent.click(getByLabelText('YES'))
  fireEvent.click(getByLabelText('NOP'))
})
