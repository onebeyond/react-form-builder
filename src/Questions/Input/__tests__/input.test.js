import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import QuestionInput from '../'

const question = {
  name: 'inputName',
  type: 'input',
  label: 'input label',
  placeholder: 'input placeholder',
  icon: {
    name: 'question-circle',
    fill: 'red'
  },
  tooltip: {
    text: 'tooltip text example',
    config: {
      backgroundColor: 'green'
    }
  },
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: true
  }
}

test('label is displayed', () => {
  const { getByText } = render(
    <QuestionInput
      question={question}
      useForm={{ errors: {}, register: () => {}, setValue: jest.fn() }}
    />
  )

  expect(getByText('input label'))
})

test('icon is displayed', () => {
  const { getByTestId } = render(
    <QuestionInput
      question={question}
      useForm={{ errors: {}, register: () => {}, setValue: jest.fn() }}
    />
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
    errorMessages: {
      required: 'This field is required'
    },
    registerConfig: {
      required: true
    }
  }
  const { getByTestId } = render(
    <QuestionInput
      question={question}
      useForm={{ errors: {}, register: () => {}, setValue: jest.fn() }}
    />
  )

  expect(getByTestId('defaultIconId'))
})

test('icon tooltip is displayed', async () => {
  const { getByTestId } = render(
    <QuestionInput
      question={question}
      useForm={{ errors: {}, register: () => {}, setValue: jest.fn() }}
    />
  )

  fireEvent.click(getByTestId('iconId'))
  await expect(screen.getByText('tooltip text example'))
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
  render(
    <QuestionInput
      question={question}
      useForm={{ errors: {}, register: () => {}, setValue: jest.fn() }}
    />
  )

  expect(!screen.queryByTestId('defaultIconId'))
})
