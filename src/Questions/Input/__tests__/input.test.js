import React from 'react'
import { fireEvent, render, screen, renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useForm } from 'react-hook-form'

import QuestionInput from '../'

const question = {
  name: 'inputName',
  type: 'input',
  label: 'input label with [link](https://www.google.com)',
  placeholder: 'input placeholder',
  icon: {
    name: 'question-circle',
    fill: 'red'
  },
  descriptions: [
    'Password must be 8-20 characters long',
    'Contain at least 1 number, 1 letter and 1 special character'
  ],
  tooltip: {
    text: 'tooltip text example',
    config: {
      backgroundColor: 'green'
    }
  },
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

test('renders label with markdown', () => {
  const { getByText } = render(
    <QuestionInput question={question} useForm={formMethods} />
  )

  expect(getByText('input label with', { exact: false })).toBeTruthy()
})

test('handles default markdown link', () => {
  const { getByRole } = render(
    <QuestionInput question={question} useForm={formMethods} />
  )

  const markDownLink = getByRole('link')
  expect(markDownLink.href).toBe('https://www.google.com/')
  expect(markDownLink.target).toBe('_blank')
})

test('handles custom markdown link callback', () => {
  const onLinkOpen = jest.fn()
  const { getByRole } = render(
    <QuestionInput
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

test('icon is displayed', () => {
  const { getByTestId } = render(
    <QuestionInput question={question} useForm={formMethods} />
  )

  expect(getByTestId('iconId'))
})

test('icon default is displayed', () => {
  const question = {
    name: 'inputName',
    type: 'input',
    label: 'input label',
    placeholder: 'input placeholder',
    icon: {
      name: 'defaultIcon',
      fill: 'red'
    },
    tooltip: {
      text: 'tooltip text example'
    },
    errorMessages: {
      required: 'This field is required'
    },
    registerConfig: {
      required: true
    }
  }
  const { getByText } = render(
    <QuestionInput question={question} useForm={formMethods} />
  )

  expect(getByText('Icon Not found'))
})

test('icon tooltip is displayed', async () => {
  const { getByTestId } = render(
    <QuestionInput question={question} useForm={formMethods} />
  )

  fireEvent.click(getByTestId('iconId'))
  await expect(screen.getByText('tooltip text example'))
})

test('icon tooltip is not displayed when there is no text', async () => {
  const question = {
    name: 'inputName',
    type: 'input',

    icon: {
      name: 'question-circle',
      fill: 'red'
    },
    tooltip: {
      config: {
        backgroundColor: 'green'
      }
    },
    errorMessages: {},
    registerConfig: {
      required: true
    }
  }
  const { getByTestId } = render(
    <QuestionInput question={question} useForm={formMethods} />
  )

  fireEvent.click(getByTestId('iconId'))
  await expect(!screen.queryByTestId('tooltipId'))
})

test('icon is not displayed', () => {
  const question = {
    name: 'inputName',
    type: 'input',
    label: 'input label',
    placeholder: 'input placeholder',
    errorMessages: {
      required: 'This field is required'
    },
    registerConfig: {
      required: true
    }
  }
  render(<QuestionInput question={question} useForm={formMethods} />)

  expect(!screen.queryByTestId('defaultIconId'))
})

test('placeholder is displayed', () => {
  const { getByPlaceholderText } = render(
    <QuestionInput question={question} useForm={formMethods} />
  )

  expect(getByPlaceholderText('input placeholder'))
})

test('descriptions are displayed', () => {
  render(<QuestionInput question={question} useForm={formMethods} />)

  expect(screen.getByText('Password must be 8-20 characters long'))
  expect(
    screen.getByText(
      'Contain at least 1 number, 1 letter and 1 special character'
    )
  )
})

test('error is displayed', () => {
  render(
    <QuestionInput
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

  expect(screen.getByText('This field is required'))
})

test('input can be filled', () => {
  const { getByTestId } = render(
    <QuestionInput question={question} useForm={formMethods} />
  )
  const inputComponent = getByTestId('question-input')
  expect(inputComponent.value).toBe('')
  fireEvent.change(inputComponent, { target: { value: 'input testing' } })
  expect(inputComponent.value).toBe('input testing')
})

test('patern error is displayed', () => {
  render(
    <QuestionInput
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
