import React from 'react'
import {
  cleanup,
  getByText,
  render,
  fireEvent,
  screen
} from '@testing-library/react'
import selectEvent from 'react-select-event'
import QuestionCountry from '../../Country'
import QuestionCounty from '../'

afterEach(cleanup)

const question = {
  type: 'county',
  label: 'Bundesland',
  name: 'county',
  id: '',
  placeholder: 'Please select an option',
  country: 'DE',
  errorMessages: { required: '', pattern: '' },
  registerConfig: { required: false }
}

const countryQuestion = {
  type: 'country',
  label: 'Country of residence',
  id: '',
  name: 'country',
  placeholder: 'Please make a selection',
  errorMessages: { required: 'This field is required', pattern: '' },
  registerConfig: { required: true, pattern: '' },
  priorityOptions: ['DE', 'GB', 'IE', 'FR'],
  dependentQuestions: [{ condition: 'DE', label: 'Germany', question }]
}

const useForm = {
  formState: { errors: {} },
  control: () => ({}),
  register: () => {},
  setValue: jest.fn(),
  unregister: jest.fn(),
  trigger: jest.fn()
}

const setup = () => {
  const renderComponent = render(
    <>
      <QuestionCountry question={countryQuestion} useForm={useForm} />
      {countryQuestion.dependentQuestions &&
        countryQuestion.dependentQuestions.map((_, index) => (
          <QuestionCounty question={question} useForm={useForm} key={index} />
        ))}
    </>
  )
  const countryComponent = renderComponent.getByTestId('question-country')
  const countryPlaceholder = renderComponent.getByText(
    'Please make a selection'
  )
  const countyComponent = renderComponent.getByTestId('question-county')
  const countyPlaceholder = renderComponent.getByText('Please select an option')
  return {
    countryComponent,
    countyComponent,
    countyPlaceholder,
    countryPlaceholder
  }
}

test('check the placeholder text', () => {
  const { countyComponent } = setup()
  getByText(countyComponent, 'Please select an option')
})

test('County label', () => {
  const { countyComponent } = setup()
  getByText(countyComponent, 'Bundesland')
})

test('label tag is not displayed when label value is null', () => {
  const questionNoLabel = { ...question }
  delete questionNoLabel.label
  render(<QuestionCounty question={questionNoLabel} useForm={useForm} />)

  expect(!screen.queryByTestId('county-label'))
})

test('County select appears when country question is clicked and GE value', async () => {
  const { countryPlaceholder } = setup()

  await selectEvent.openMenu(countryPlaceholder)
  fireEvent.keyDown(countryPlaceholder, { key: 'Enter', code: 13 })
  await expect(screen.getByText('Germany'))
  expect(screen.getByText('Please select an option'))
})

test('County select is opened on the right country region', async () => {
  const { countryPlaceholder, countyPlaceholder } = setup()

  await selectEvent.openMenu(countryPlaceholder)
  fireEvent.keyDown(countryPlaceholder, { key: 'Enter', code: 13 })
  await expect(screen.getByText('Germany'))
  expect(screen.getByText('Please select an option'))

  await selectEvent.openMenu(countyPlaceholder)
  fireEvent.keyDown(countyPlaceholder, { key: 'Enter', code: 13 })
  await expect(screen.getByText('Baden-Württemberg'))
})

test('renders a fallback country list when country condition is not supported', async () => {
  const question = {
    type: 'county',
    label: 'County',
    name: 'county',
    id: '',
    placeholder: 'Please select an option',
    country: '',
    errorMessages: { required: '', pattern: '' },
    registerConfig: { required: false }
  }

  const { getByText } = render(
    <QuestionCounty question={question} useForm={useForm} />
  )

  const countySelect = getByText('Please select an option')

  await selectEvent.openMenu(countySelect)
  fireEvent.keyDown(countySelect, { key: 'Enter', code: 13 })
  expect(screen.getByText('Aberdeen City'))
})

test('show an error message', () => {
  const question = {
    type: 'county',
    label: 'County',
    name: 'county',
    id: '',
    placeholder: 'Please select an option',
    country: '',
    errorMessages: { required: 'This question is required', pattern: '' },
    registerConfig: { required: true }
  }

  const { getByText } = render(
    <QuestionCounty
      question={question}
      useForm={{
        control: () => ({}),
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
