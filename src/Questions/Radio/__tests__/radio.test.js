import React from 'react'
import { render, fireEvent, renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useForm } from 'react-hook-form'

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
const { result } = renderHook(() => useForm())
const formMethods = result.current

test('markdown is displayed', () => {
  const { getByText } = render(
    <QuestionRadio question={question} useForm={formMethods} />
  )

  expect(getByText('question text to display'))
})

test('handles default markdown link', () => {
  const questionWithLink = {
    ...question,
    label: 'question text to display[radio link](https://www.google.es)'
  }

  const { getByRole } = render(
    <QuestionRadio question={questionWithLink} useForm={formMethods} />
  )

  const markDownLink = getByRole('link')
  expect(markDownLink.href).toBe('https://www.google.es/')
  expect(markDownLink.target).toBe('_blank')
})

test('radio labels are displayed', () => {
  const { getByLabelText } = render(
    <QuestionRadio question={question} useForm={formMethods} />
  )
  expect(getByLabelText('YES'))
  expect(getByLabelText('NOP'))
})

test('radio values are assigned', () => {
  const { getByLabelText } = render(
    <QuestionRadio question={question} useForm={formMethods} />
  )
  expect(getByLabelText('YES').value).toBe('true')
  expect(getByLabelText('NOP').value).toBe('false')
})

test('error is displayed', () => {
  const { getByText } = render(
    <QuestionRadio
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
  expect(getByText('This field is required'))
})

test('radio can be selected', () => {
  const { getByLabelText } = render(
    <QuestionRadio question={question} useForm={formMethods} />
  )
  fireEvent.click(getByLabelText('YES'))
  fireEvent.click(getByLabelText('NOP'))
})
