import React from 'react'
import {
  cleanup,
  getByText,
  screen,
  render,
  fireEvent
} from '@testing-library/react'
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
  customOrder: [
    {
      countryShortCode: 'GB'
    }
  ],
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
  const placeholderComponent = renderComponent.getByText(
    'Please select an option ^^'
  )

  return { countryComponent, placeholderComponent }
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
  const { placeholderComponent } = setup()
  await selectEvent.select(placeholderComponent, ['China'])

  expect(screen.getByText('China'))
})

test('check the custom order of the countries', async () => {
  const { placeholderComponent } = setup()
  await selectEvent.openMenu(placeholderComponent)
  fireEvent.keyDown(placeholderComponent, { key: 'ArrowDown' })
  fireEvent.keyDown(placeholderComponent, { key: 'Enter', code: 13 })

  expect(screen.getByText('United Kingdom'))
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
