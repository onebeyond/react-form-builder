import React from 'react'
import { fireEvent, render, renderHook } from '@testing-library/react'
import selectEvent from 'react-select-event'
import { useForm } from 'react-hook-form'
import QuestionSelect from '../'

import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

const question = {
  name: 'gender',
  type: 'select',
  label: 'What is your [gender](https://www.google.com)?',
  placeholder: 'Please make a selection',
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: {}
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

test('renders label with markdown', () => {
  const { getByText } = render(
    <QuestionSelect question={question} useForm={formMethods} />
  )

  expect(getByText('What is your ', { exact: false })).toBeTruthy()
})

test('handles default markdown link', () => {
  const { getByRole } = render(
    <QuestionSelect question={question} useForm={formMethods} />
  )

  const markDownLink = getByRole('link')
  expect(markDownLink.href).toBe('https://www.google.com/')
  expect(markDownLink.target).toBe('_blank')
})

test('handles custom markdown link callback', () => {
  const onLinkOpen = jest.fn()
  const { getByRole } = render(
    <QuestionSelect
      question={{
        ...question,
        label: 'input label with [link](#somewhere)'
      }}
      onLinkOpen={onLinkOpen}
      useForm={formMethods}
    />
  )
  const markDownLink = getByRole('link')
  expect(markDownLink.href).toContain('#')
  fireEvent.click(markDownLink)
  expect(onLinkOpen).toBeCalledWith('somewhere')
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

test('check if it preselects an option from the config', () => {
  const questionWithDefaultValue = {
    ...question,
    defaultValue: {
      label: 'Male',
      value: 'male'
    }
  }

  const { getByText } = render(
    <QuestionSelect question={questionWithDefaultValue} useForm={formMethods} />
  )

  expect(getByText('Male', { exact: false })).toBeTruthy()
})
