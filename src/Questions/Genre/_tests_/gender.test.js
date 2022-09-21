import React from 'react'
import {
  cleanup,
  getByText,
  render,
  fireEvent,
  screen
} from '@testing-library/react'
import selectEvent from 'react-select-event'
import QuestionGender from '../'

afterEach(cleanup)

const question = {
  type: 'gender',
  label: 'What is your gender?',
  name: 'gender',
  id: '',
  placeholder: 'Please select a gender',
  errorMessages: { required: 'This field is required', pattern: '' },
  registerConfig: { required: true }
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
    <QuestionGender question={question} useForm={useForm} />
  )
  const genderComponent = renderComponent.getByTestId('question-gender')
  const genderPlaceholder = renderComponent.getByText('Please select a gender')

  return { genderComponent, genderPlaceholder }
}

test('check the placeholder text', () => {
  const { genderComponent } = setup()
  getByText(genderComponent, 'Please select a gender')
})

test('Gender label', () => {
  const { genderComponent } = setup()
  getByText(genderComponent, 'What is your gender?')
})

test('label tag is not displayed when label value is null', () => {
  const questionNoLabel = { ...question }
  delete questionNoLabel.label
  render(<QuestionGender question={questionNoLabel} useForm={useForm} />)

  expect(!screen.queryByTestId('gender-label'))
})

test('Change value of gender select', async () => {
  const { genderPlaceholder } = setup()

  await selectEvent.openMenu(genderPlaceholder)
  fireEvent.keyDown(genderPlaceholder, { key: 'Enter', code: 13 })
  await expect(screen.getByText('Male'))
})
test('Check custum options are rendered', async () => {
  const question = {
    type: 'gender',
    label: 'What is your gender?',
    name: 'gender',
    id: '',
    placeholder: 'Please select a gender',
    errorMessages: { required: 'This field is required', pattern: '' },
    registerConfig: { required: true },
    config: {
      options: [
        {
          label: 'Female',
          value: 'female'
        },
        {
          label: 'Prefer not to say',
          value: 'prefer_not_to_say'
        }
      ]
    }
  }
  const { getByText } = render(
    <QuestionGender question={question} useForm={useForm} />
  )
  const genderPlaceholder = getByText('Please select a gender')

  await selectEvent.openMenu(genderPlaceholder)
  fireEvent.keyDown(genderPlaceholder, { key: 'Enter', code: 13 })
  await expect(screen.getByText('Female'))
})

test('renders a country list in spanish', async () => {
  const data = { language: 'es', select: 'Masculino' }
  const question = {
    name: 'gender_es',
    type: 'gender',
    label: '¿Cuál es tu género?',
    placeholder: 'Elige una opción',
    errorMessages: { required: 'Este campo es obligatorio' }
  }

  const { getByText } = render(
    <QuestionGender
      language={data.language}
      question={question}
      useForm={useForm}
    />
  )

  const select = getByText('Elige una opción')

  await selectEvent.openMenu(select)
  fireEvent.keyDown(select, { key: 'Enter', code: 13 })
  expect(screen.getByText(data.select))
})

test('renders a country list in french', async () => {
  const data = { language: 'fr', select: 'Masculin' }
  const question = {
    name: 'gender_fr',
    type: 'gender',
    label: 'GENRE',
    placeholder: 'Veuillez faire une sélection',
    errorMessages: { required: 'Ce champ est obligatoire' }
  }

  const { getByText } = render(
    <QuestionGender
      language={data.language}
      question={question}
      useForm={useForm}
    />
  )

  const select = getByText('Veuillez faire une sélection')

  await selectEvent.openMenu(select)
  fireEvent.keyDown(select, { key: 'Enter', code: 13 })
  expect(screen.getByText(data.select))
})

test('renders a country list in deusch', async () => {
  const data = { language: 'de', select: 'Männlich' }
  const question = {
    name: 'gender_de',
    type: 'gender',
    label: 'GESCHLECHT',
    placeholder: 'Bitte treffen Sie eine Auswahl',
    errorMessages: { required: 'Dieses Feld ist erforderlich' }
  }

  const { getByText } = render(
    <QuestionGender
      language={data.language}
      question={question}
      useForm={useForm}
    />
  )

  const select = getByText('Bitte treffen Sie eine Auswahl')

  await selectEvent.openMenu(select)
  fireEvent.keyDown(select, { key: 'Enter', code: 13 })
  expect(screen.getByText(data.select))
})

test('renders a country list in swedish', async () => {
  const data = { language: 'se', select: 'Man' }
  const question = {
    name: 'gender_se',
    type: 'gender',
    label: 'KÖN',
    placeholder: 'Gör ett val',
    errorMessages: { required: 'Det här fältet är obligatoriskt' }
  }

  const { getByText } = render(
    <QuestionGender
      language={data.language}
      question={question}
      useForm={useForm}
    />
  )

  const select = getByText('Gör ett val')

  await selectEvent.openMenu(select)
  fireEvent.keyDown(select, { key: 'Enter', code: 13 })
  expect(screen.getByText(data.select))
})

test('show an error message', () => {
  const { getByText } = render(
    <QuestionGender
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
