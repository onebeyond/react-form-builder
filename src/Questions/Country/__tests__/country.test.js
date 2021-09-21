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
  priorityOptions: ['GB', 'ES'],
  errorMessages: {
    required: 'This field is required'
  }
}

const customListCountries = [
  { cn: 'MyOwnCountry1', cs: 'MC1' },
  { cn: 'MyOwnCountry2', cs: 'MC2' },
  { cn: 'MyOwnCountry3', cs: 'MC3' },
  { cn: 'MyOwnCountry4', cs: 'MC4' }
]

const setup = (customListCountries) => {
  const renderComponent = render(
    <QuestionCountry
      question={question}
      countryAndRegionsData={customListCountries}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn(),
        trigger: jest.fn()
      }}
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
  const question = {
    name: 'country_of_residence',
    type: 'country',
    label: 'This is the label of the country select',
    placeholder: 'Please select an option ^^',
    priorityOptions: ['ES'],
    errorMessages: {
      required: 'This field is required'
    }
  }
  const { getByText } = render(
    <QuestionCountry
      question={question}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn(),
        trigger: jest.fn()
      }}
    />
  )
  const select = getByText('Please select an option ^^')

  await selectEvent.openMenu(select)
  fireEvent.keyDown(select, { key: 'Enter', code: 13 })
  expect(screen.getByText('Spain'))
})

test('sort country list by default', async () => {
  const question = {
    name: 'country_of_residence',
    type: 'country',
    label: 'This is the label of the country select',
    placeholder: 'Please select an option ^^',
    errorMessages: {
      required: 'This field is required'
    }
  }

  const { getByText } = render(
    <QuestionCountry
      question={question}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn(),
        trigger: jest.fn()
      }}
    />
  )

  const select = getByText('Please select an option ^^')

  await selectEvent.openMenu(select)
  fireEvent.keyDown(select, { key: 'Enter', code: 13 })
  expect(screen.getByText('Afghanistan'))
})

test('handle country priority order', async () => {
  const question = {
    name: 'country_of_residence',
    type: 'country',
    label: 'This is the label of the country select',
    placeholder: 'Please select an option ^^',
    priorityOptions: ['GB', 'ES'],
    errorMessages: {
      required: 'This field is required'
    }
  }

  const { getByText } = render(
    <QuestionCountry
      question={question}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn(),
        trigger: jest.fn()
      }}
    />
  )

  const select = getByText('Please select an option ^^')

  await selectEvent.openMenu(select)
  fireEvent.keyDown(select, { key: 'Enter', code: 13 })
  expect(screen.getByText('United Kingdom'))
})

test('check all the countries are rendered', async () => {
  const { placeholderComponent } = setup(customListCountries)

  await selectEvent.openMenu(placeholderComponent)
  for (let i = 0; i < customListCountries.length; i++) {
    expect(screen.getByText('MyOwnCountry' + (i + 1)))
  }
})

test('label tag is not displayed when label value is null', () => {
  const questionNoLabel = { ...question }
  delete questionNoLabel.label
  render(
    <QuestionCountry
      question={questionNoLabel}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn(),
        trigger: jest.fn()
      }}
    />
  )

  expect(!screen.queryByTestId('country-label'))
})

test('renders a country list in spanish', async () => {
  const data = {
    language: 'es',
    select: 'España'
  }
  const question = {
    name: 'country_of_residence',
    type: 'country',
    label: 'This is the label of the country select',
    placeholder: 'Please select an option ^^',
    priorityOptions: ['ES'],
    errorMessages: {
      required: 'This field is required'
    }
  }

  const { getByText } = render(
    <QuestionCountry
      language={data.language}
      question={question}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn(),
        trigger: jest.fn()
      }}
    />
  )

  const select = getByText('Please select an option ^^')

  await selectEvent.openMenu(select)
  fireEvent.keyDown(select, { key: 'Enter', code: 13 })
  expect(screen.getByText(data.select))
})

test('renders a country list in french', async () => {
  const data = {
    language: 'fr',
    select: 'Espagne'
  }

  const question = {
    name: 'country_of_residence',
    type: 'country',
    label: 'This is the label of the country select',
    placeholder: 'Please select an option ^^',
    priorityOptions: ['ES'],
    errorMessages: {
      required: 'This field is required'
    }
  }

  const { getByText } = render(
    <QuestionCountry
      language={data.language}
      question={question}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn(),
        trigger: jest.fn()
      }}
    />
  )

  const select = getByText('Please select an option ^^')

  await selectEvent.openMenu(select)
  fireEvent.keyDown(select, { key: 'Enter', code: 13 })
  expect(screen.getByText(data.select))
})

test('renders a country list in deusche', async () => {
  const data = {
    language: 'de',
    select: 'Spanien'
  }
  const question = {
    name: 'country_of_residence',
    type: 'country',
    label: 'This is the label of the country select',
    placeholder: 'Please select an option ^^',
    priorityOptions: ['ES'],
    errorMessages: {
      required: 'This field is required'
    }
  }

  const { getByText } = render(
    <QuestionCountry
      language={data.language}
      question={question}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn(),
        trigger: jest.fn()
      }}
    />
  )

  const select = getByText('Please select an option ^^')

  await selectEvent.openMenu(select)
  fireEvent.keyDown(select, { key: 'Enter', code: 13 })
  expect(screen.getByText(data.select))
})

test('renders a fallback country list when the language is not supported', async () => {
  const data = {
    language: 'qwerty',
    select: 'Spain'
  }
  const question = {
    name: 'country_of_residence',
    type: 'country',
    label: 'This is the label of the country select',
    placeholder: 'Please select an option ^^',
    priorityOptions: ['ES'],
    errorMessages: {
      required: 'This field is required'
    }
  }

  const { getByText } = render(
    <QuestionCountry
      language={data.language}
      question={question}
      useForm={{
        errors: {},
        register: () => {},
        setValue: jest.fn(),
        unregister: jest.fn(),
        trigger: jest.fn()
      }}
    />
  )

  const select = getByText('Please select an option ^^')

  await selectEvent.openMenu(select)
  fireEvent.keyDown(select, { key: 'Enter', code: 13 })
  expect(screen.getByText(data.select))
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
        setValue: jest.fn(),
        unregister: jest.fn(),
        trigger: jest.fn()
      }}
    />
  )
  expect(getByText(question.errorMessages.required)).toBeTruthy()
})
