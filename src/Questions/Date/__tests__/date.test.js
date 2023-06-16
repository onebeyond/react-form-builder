import React from 'react'
import {
  fireEvent,
  render,
  screen,
  queryByAttribute,
  renderHook
} from '@testing-library/react'
import { useForm } from 'react-hook-form'
import QuestionDate from '../'

const question = {
  name: 'dob',
  type: 'date',
  label: 'Date of birth',
  placeholder: 'dd/mm/yyyy',
  minAge: 18,
  errorMessages: {
    required: 'This field is required',
    underAge: 'You must be 18 years old or above'
  },
  registerConfig: {
    required: true
  }
}
const { result } = renderHook(() => useForm())
const formMethods = result.current

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    marginLeft: 0,
    borderLeftWidth: 0
  })
})

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document
    }
  })
}

const getById = queryByAttribute.bind(null, 'id')

test('required error is displayed', () => {
  const { getByText } = render(
    <QuestionDate
      question={question}
      useForm={{
        ...formMethods,
        formState: {
          errors: {
            [question.name]: {
              type: 'required'
            }
          }
        }
      }}
    />
  )

  expect(getByText('This field is required'))
})

test('under-age error error is displayed', () => {
  const { getByText } = render(
    <QuestionDate
      question={question}
      useForm={{
        ...formMethods,
        formState: {
          errors: {
            [question.name]: {
              type: 'underAge'
            }
          }
        }
      }}
    />
  )

  expect(getByText('You must be 18 years old or above'))
})

test('Select day dropdown is opened in the right date', () => {
  const { container } = render(
    <QuestionDate question={question} useForm={formMethods} />
  )
  const calendar = getById(container, 'select-day')

  fireEvent.click(calendar)

  expect(screen.getByText('01'))
})

test('Select month dropdown is opened in the right date', () => {
  const { container } = render(
    <QuestionDate question={question} useForm={formMethods} />
  )
  const calendar = getById(container, 'select-month')

  fireEvent.click(calendar)

  expect(screen.getByText('10'))
})

test('Select year dropdown is opened in the right date', () => {
  const { container } = render(
    <QuestionDate question={question} useForm={formMethods} />
  )
  const calendar = getById(container, 'select-year')

  fireEvent.click(calendar)

  expect(screen.getByText('January'))
})

test('calendar is opened minAge years ago', () => {
  const question = {
    name: 'dob',
    type: 'date',
    label: 'Date of birth',
    minAge: 23,
    errorMessages: {
      required: 'This field is required'
    },
    registerConfig: {
      required: true
    }
  }
  const { container } = render(
    <QuestionDate question={question} useForm={formMethods} />
  )

  const yearpicker = getById(container, 'select-year')

  fireEvent.click(yearpicker)
  const date = new Date()

  const dayYear = date.getFullYear() - question.minAge

  expect(screen.getByText(dayYear, { exact: false })).toBeTruthy()
})

test('calendar is opened in new Date', () => {
  const question = {
    name: 'dob',
    type: 'date',
    label: 'Date of birth',
    errorMessages: {
      required: 'This field is required'
    },
    registerConfig: {
      required: true
    }
  }
  const { container } = render(
    <QuestionDate question={question} useForm={formMethods} />
  )

  const yearpicker = getById(container, 'select-year')

  fireEvent.click(yearpicker)
  const date = new Date()

  const dayYear = date.getFullYear()

  expect(screen.getByText(dayYear, { exact: false })).toBeTruthy()
})

test('dateformat is applied', () => {
  const question = {
    name: 'dob',
    type: 'date',
    label: 'Date of birth',
    dateFormat: 'dd-MM-yyyy',
    errorMessages: {
      required: 'This field is required'
    },
    registerConfig: {
      required: true
    }
  }

  const { container } = render(
    <QuestionDate question={question} useForm={formMethods} />
  )
  const yearpicker = getById(container, 'select-year')
  const monthpicker = getById(container, 'select-month')
  const daypicker = getById(container, 'select-day')

  fireEvent.change(yearpicker, { target: { value: '2011' } })
  fireEvent.click(yearpicker)
  fireEvent.keyDown(yearpicker, { key: 'Enter', code: 13 })
  expect(yearpicker.value).toBe('2011')

  fireEvent.change(monthpicker, { target: { value: '11' } })
  fireEvent.click(monthpicker)
  fireEvent.keyDown(monthpicker, { key: 'Enter', code: 13 })
  expect(monthpicker.value).toBe('11')

  fireEvent.change(daypicker, { target: { value: '11' } })
  fireEvent.click(daypicker)
  fireEvent.keyDown(daypicker, { key: 'Enter', code: 13 })
  expect(daypicker.value).toBe('11')
})

test('calendar is in spanish', () => {
  const { container } = render(
    <QuestionDate question={question} language='es' useForm={formMethods} />
  )
  const calendar = getById(container, 'select-month')

  fireEvent.click(calendar)

  expect(screen.getByText('Enero', { exact: false })).toBeTruthy()
})

test('calendar is in french', () => {
  const { container } = render(
    <QuestionDate question={question} language='fr' useForm={formMethods} />
  )
  const calendar = getById(container, 'select-month')

  fireEvent.click(calendar)

  expect(screen.getByText('janvier', { exact: false })).toBeTruthy()
})

test('calendar is in german', () => {
  const { container } = render(
    <QuestionDate question={question} language='de' useForm={formMethods} />
  )
  const calendar = getById(container, 'select-month')

  fireEvent.click(calendar)

  expect(screen.getByText('januar', { exact: false })).toBeTruthy()
})

test('calendar sending no-valid language', () => {
  const { container } = render(
    <QuestionDate question={question} language='qwerty' useForm={formMethods} />
  )
  const calendar = getById(container, 'select-month')

  fireEvent.click(calendar)

  expect(screen.getByText('january', { exact: false })).toBeTruthy()
})
