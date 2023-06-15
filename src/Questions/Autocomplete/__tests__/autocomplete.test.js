import React from 'react'
import {
  cleanup,
  getByText,
  render,
  screen,
  waitFor,
  fireEvent
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import selectEvent from 'react-select-event'
import QuestionAutocomplete from '..'

import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

const mockResponse = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Grappes', value: 'grappes' },
  { label: 'Watermelon', value: 'watermelon' }
]
beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse)
  })
})

afterEach(cleanup)

const question = {
  name: 'how_do_you_feel_about_this_partnership',
  type: 'autocomplete',
  label: 'How do you feel about this partnership?',
  placeholder: 'Please make a selection',
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: true
  },
  config: {
    headers: { authorization: '' },
    url: 'https://jsonplaceholder.typicode.com/users',
    params: []
  }
}

const useForm = {
  formState: { errors: {} },
  control: () => {},
  register: () => {},
  setValue: jest.fn(),
  unregister: jest.fn(),
  trigger: jest.fn()
}

const setup = () => {
  const renderComponent = render(
    <QuestionAutocomplete question={question} useForm={useForm} />
  )
  const autocompleteComponent = renderComponent.getByTestId(
    'question-autocomplete'
  )
  const autocompletePlaceholder = renderComponent.getByText(
    'Please make a selection'
  )
  const selectInput = document.getElementById('react-select-2-input')
  const input = screen
    .getByTestId('question-autocomplete')
    .querySelector('input')

  return { autocompleteComponent, autocompletePlaceholder, selectInput, input }
}
test('check if component is rendered', () => {
  const { autocompleteComponent } = setup()
  expect(autocompleteComponent).toBeTruthy()
})

test('check if placeholder exists', () => {
  const { autocompleteComponent } = setup()
  getByText(autocompleteComponent, 'Please make a selection')
})

test('check if label exists', () => {
  const { autocompleteComponent } = setup()
  getByText(autocompleteComponent, 'How do you feel about this partnership?')
})

test('label tag is not displayed when label value is null', () => {
  const questionNoLabel = { ...question }
  delete questionNoLabel.label
  render(<QuestionAutocomplete question={questionNoLabel} useForm={useForm} />)

  expect(!screen.queryByTestId('autocomplete-label'))
})

test('Change value of autocomplete select', async () => {
  const { input, autocompletePlaceholder } = setup()

  fireEvent.change(input, { target: { value: 'app' } })

  await waitFor(() => expect(input.value).toBe('app'))
  await selectEvent.select(
    screen.getByLabelText('How do you feel about this partnership?'),
    'Apple'
  )
  await selectEvent.openMenu(autocompletePlaceholder)
  fireEvent.keyDown(autocompletePlaceholder, { key: 'Enter', code: 13 })
  await expect(screen.getByText('Apple'))
})

test('check if error exists', () => {
  const { getByText } = render(
    <QuestionAutocomplete
      question={question}
      useForm={{
        control: {},
        formState: {
          errors: {
            [question.name]: {
              type: 'required'
            }
          }
        },
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn(),
        trigger: jest.fn()
      }}
    />
  )
  expect(getByText(question.errorMessages.required)).toBeTruthy()
})
