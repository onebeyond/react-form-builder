import React from 'react'
import {
  cleanup,
  getByText,
  render,
  fireEvent,
  screen
} from '@testing-library/react'
import selectEvent from 'react-select-event'
import QuestionAutocomplete from '..'

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
    options: [
      {
        label: 'Much more appealing',
        value: 'much_more_appealing'
      },
      {
        label: 'Appealing',
        value: 'appealing'
      },
      {
        label: "Doesn't change",
        value: 'doesnt_change'
      },
      {
        label: 'Less appealing',
        value: 'less_applealing'
      }
    ]
  }
}

const useForm = {
  errors: {},
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

  return { autocompleteComponent, autocompletePlaceholder }
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
  const { autocompletePlaceholder } = setup()

  await selectEvent.openMenu(autocompletePlaceholder)
  fireEvent.keyDown(autocompletePlaceholder, { key: 'Enter', code: 13 })
  await expect(screen.getByText('Much more appealing'))
})

test('check if error exists', () => {
  const { getByText } = render(
    <QuestionAutocomplete
      question={question}
      useForm={{
        errors: {
          [question.name]: {
            type: 'required'
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
