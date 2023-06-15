import React from 'react'
import {
  cleanup,
  getByText,
  render,
  fireEvent,
  screen
} from '@testing-library/react'
import selectEvent from 'react-select-event'
import QuestionAge from '../'
import { useForm as useHookForm } from 'react-hook-form'
jest.mock('react-hook-form')

afterEach(cleanup)

const question = {
  type: 'age',
  label: 'Age',
  name: 'age',
  id: '',
  placeholder: 'Please select an age',
  errorMessages: { required: 'This field is required', pattern: '' },
  registerConfig: { required: true }
}

const useForm = useHookForm
beforeEach(() => {
  useForm.mockImplementation(() => ({
    handleSubmit: jest.fn(),
    formState: {
      errors: {},
      isDirty: true,
      isSubmitting: false,
      isValid: true
    },
    register: jest.fn(),
    watch: jest.fn()
  }))
})

const setup = () => {
  const renderComponent = render(
    <QuestionAge question={question} useForm={useForm} />
  )
  const ageComponent = renderComponent.getByTestId('question-age')
  const agePlaceholder = renderComponent.getByText('Please select an age')

  return { ageComponent, agePlaceholder }
}

test('check the placeholder text', () => {
  const { ageComponent } = setup()
  getByText(ageComponent, 'Please select an age')
})

test('Age label', () => {
  const { ageComponent } = setup()
  getByText(ageComponent, 'Age')
})

test('label tag is not displayed when label value is null', () => {
  const questionNoLabel = { ...question }
  delete questionNoLabel.label
  render(<QuestionAge question={questionNoLabel} useForm={useForm} />)

  expect(!screen.queryByTestId('age-label'))
})

test('Change value of age select', async () => {
  const { agePlaceholder } = setup()

  await selectEvent.openMenu(agePlaceholder)
  fireEvent.keyDown(agePlaceholder, { key: 'Enter', code: 13 })
  await expect(screen.getByText('18-24'))
})

test('Check custom options are rendered', async () => {
  const question = {
    type: 'age',
    label: 'Age',
    name: 'age',
    id: '',
    placeholder: 'Please select an age',
    errorMessages: { required: 'This field is required', pattern: '' },
    registerConfig: { required: true },
    config: {
      options: [
        {
          label: '34-41',
          value: '34-41'
        },
        {
          label: '42-49',
          value: '42-49'
        }
      ]
    }
  }
  const { getByText } = render(
    <QuestionAge question={question} useForm={useForm} />
  )
  const agePlaceholder = getByText('Please select an age')

  await selectEvent.openMenu(agePlaceholder)
  fireEvent.keyDown(agePlaceholder, { key: 'Enter', code: 13 })
  await expect(screen.getByText('34-41'))
})

// test('show an error message', () => {
//   const { getByText } = render(
//     <QuestionAge
//       question={question}
//       useForm={{
//         control: () => ({}),
//         formState: {
//           errors: {
//             [question.name]: {
//               type: 'required'
//             }
//           }
//         },
//         register: () => {},
//         setValue: jest.fn(),
//         unregister: jest.fn(),
//         trigger: jest.fn()
//       }}
//     />
//   )
//   expect(getByText(question.errorMessages.required)).toBeTruthy()
// })
