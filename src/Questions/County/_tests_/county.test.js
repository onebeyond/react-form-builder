import React from 'react'
import {
  selectEvent,
  fireEvent,
  cleanup,
  getByText,
  render
} from '@testing-library/react'
import QuestionCountry from '../../Country'
import QuestionCounty from '../'

afterEach(cleanup)

const countryPlaceholder = 'Please make a selection'
const countyPlaceholder = 'Please select an option'

const question = {
  type: 'county',
  label: 'Bundesland',
  name: 'county',
  id: '',
  placeholder: countyPlaceholder,
  country: 'DE',
  errorMessages: { required: '', pattern: '' },
  registerConfig: { required: false }
}

const countryQuestion = {
  type: 'country',
  label: 'Country of residence',
  id: '',
  name: 'country',
  placeholder: countryPlaceholder,
  errorMessages: { required: 'This field is required', pattern: '' },
  registerConfig: { required: true, pattern: '' },
  priorityOptions: ['DE', 'GB', 'IE', 'FR'],
  dependentQuestions: [{ condition: 'DE', label: 'Germany', question }]
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
    <>
      <QuestionCountry question={countryQuestion} useForm={useForm} />
      {countryQuestion.dependentQuestions &&
        countryQuestion.dependentQuestions?.map((_, index) => (
          <QuestionCounty question={question} useForm={useForm} key={index} />
        ))}
    </>
  )
  const countryComponent = renderComponent.getByTestId('question-country')
  const countryPlaceholderComponent =
    renderComponent.getByText(countryPlaceholder)
  const countyComponent = renderComponent.getByTestId('question-county')
  const placeholderComponent = renderComponent.getByText(countyPlaceholder)
  return {
    countryComponent,
    countyComponent,
    placeholderComponent,
    countryPlaceholderComponent
  }
}

test('check the placeholder text', () => {
  const { countyComponent } = setup()
  getByText(countyComponent, countyPlaceholder)
})

test('County label', () => {
  const { countyComponent } = setup()
  getByText(countyComponent, 'Bundesland')
})

test.only('County select appears when country question is clicked and GE value', async () => {
  const { countryPlaceholderComponent } = setup()

  await selectEvent.openMenu(countryPlaceholderComponent)
  fireEvent.keyDown(countryPlaceholderComponent, { key: 'Enter', code: 13 })
  expect(screen.getByText('Germany'))
  expect(screen.getByText(countyPlaceholder))
})

test('County select is opened on the right country region', async () => {
  const { placeholderComponent } = setup()

  await selectEvent.openMenu(placeholderComponent)
  fireEvent.keyDown(placeholderComponent, { key: 'Enter', code: 13 })
  expect(screen.getByText('Baden-Württemberg'))
})
