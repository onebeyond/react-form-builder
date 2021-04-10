import React from 'react'
import { cleanup, getByText, screen, render } from '@testing-library/react'
import QuestionCountry from '../'
import selectEvent from 'react-select-event'

import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

afterEach(cleanup)

const question = {
  name: 'country_of_residence',
  type: 'country',
  label: 'This is the label of the country select',
  placeholder: 'Please select an option ^^',
  errorMessages: {
    required: 'This field is required'
  }
}

const setup = () => {
  const renderComponent = render(
    <QuestionCountry
      question={question}
      useForm={{ errors: {}, register: () => {}, setValue: jest.fn() }}
    />
  )

  const countryComponent = renderComponent.getByTestId('question-country')
  const roleComponent = renderComponent.getByRole('textbox')
  const labelComponent = renderComponent.getByText('Please select an option ^^')

  return { countryComponent, roleComponent, labelComponent }
}

test('check the placeholder text', () => {
  const { countryComponent } = setup()
  getByText(countryComponent, 'Please select an option ^^')
})

test('Country label', () => {
  const { countryComponent } = setup()
  getByText(countryComponent, 'This is the label of the country select')
})

test('change value of select', async () => {
  const { labelComponent } = setup()
  await selectEvent.select(labelComponent, ['China'])

  expect(screen.getByText('China'))
})

test('show an error message', () => {
  const { getByText } = render(
    <QuestionCountry
      question={question}
      useForm={{
        errors: {
          [question.name]: {
            type: 'required'
          }
        },
        register: () => {},
        setValue: jest.fn()
      }}
    />
  )
  expect(getByText(question.errorMessages.required)).toBeTruthy()
})
