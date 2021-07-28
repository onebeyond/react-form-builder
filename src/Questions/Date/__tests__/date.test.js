import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import QuestionDate from '../'
import { renderHook } from '@testing-library/react-hooks'
import { useForm } from 'react-hook-form'

const question = {
  name: 'dob',
  type: 'date',
  label: 'Date of birth',
  placeholder: 'dd/mm/yyyy',
  openToDate: '1-1-2000',
  errorMessages: {
    required: 'This field is required',
    underAge: 'You must be 18 years old or above'
  },
  registerConfig: {
    required: true
  }
}

let control
beforeEach(async () => {
  const { result } = renderHook(() => useForm())
  control = result.current.control
})

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

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

test('placeholder is displayed', () => {
  const { getByPlaceholderText } = render(
    <QuestionDate
      question={question}
      useForm={{
        control: control,
        formState: { errors: {} },
        register: () => {}
      }}
    />
  )

  expect(getByPlaceholderText('dd/mm/yyyy'))
})

test('required error is displayed', () => {
  const { getByText } = render(
    <QuestionDate
      question={question}
      useForm={{
        control: control,
        formState: {
          errors: {
            [question.name]: {
              type: 'required'
            }
          }
        },
        register: () => {}
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
        control: control,
        formState: {
          errors: {
            [question.name]: {
              type: 'underAge'
            }
          }
        },
        register: () => {}
      }}
    />
  )

  expect(getByText('You must be 18 years old or above'))
})

test('calendar is opened in the right date', () => {
  const { getByPlaceholderText } = render(
    <QuestionDate
      question={question}
      useForm={{
        control: control,
        formState: { errors: {} },
        register: () => {}
      }}
    />
  )
  const calendar = getByPlaceholderText('dd/mm/yyyy')

  fireEvent.click(calendar)

  expect(screen.getByText('January 2000'))
})

test('calendar is opened minAge years ago', () => {
  const question = {
    name: 'dob',
    type: 'date',
    label: 'Date of birth',
    placeholder: 'dd/mm/yyyy',
    minAge: 23,
    errorMessages: {
      required: 'This field is required'
    },
    registerConfig: {
      required: true
    }
  }
  const { getByPlaceholderText } = render(
    <QuestionDate
      question={question}
      useForm={{
        control: control,
        formState: { errors: {} },
        register: () => {}
      }}
    />
  )

  const datepicker = getByPlaceholderText('dd/mm/yyyy')

  fireEvent.click(datepicker)
  const date = new Date()

  const dayYear =
    monthNames[date.getMonth().toString()] +
    ' ' +
    (date.getFullYear() - question.minAge)

  expect(screen.getByText(dayYear, { exact: false })).toBeTruthy()
})

test('calendar is opened in new Date', () => {
  const question = {
    name: 'dob',
    type: 'date',
    label: 'Date of birth',
    placeholder: 'dd/mm/yyyy',
    errorMessages: {
      required: 'This field is required'
    },
    registerConfig: {
      required: true
    }
  }
  const { getByPlaceholderText } = render(
    <QuestionDate
      question={question}
      useForm={{
        control: control,
        formState: { errors: {} },
        register: () => {}
      }}
    />
  )

  const datepicker = getByPlaceholderText('dd/mm/yyyy')

  fireEvent.click(datepicker)
  const date = new Date()

  const dayYear =
    monthNames[date.getMonth().toString()] + ' ' + date.getFullYear()

  expect(screen.getByText(dayYear, { exact: false })).toBeTruthy()
})

test('dateformat is applied', () => {
  const question = {
    name: 'dob',
    type: 'date',
    label: 'Date of birth',
    placeholder: 'dd/mm/yyyy',
    dateFormat: 'dd-MM-yyyy',
    errorMessages: {
      required: 'This field is required'
    },
    registerConfig: {
      required: true
    }
  }

  const { getByPlaceholderText } = render(
    <QuestionDate
      question={question}
      useForm={{
        control: control,
        formState: { errors: {} },
        register: () => {},
        setValue: jest.fn()
      }}
    />
  )
  const datepicker = getByPlaceholderText('dd/mm/yyyy')
  fireEvent.change(datepicker, { target: { value: '11/11/2011' } })
  fireEvent.click(datepicker)
  fireEvent.keyDown(datepicker, { key: 'Enter', code: 13 })
  expect(datepicker.value).toBe('11-11-2011')
})

test('default dateformat is applied', () => {
  const { getByPlaceholderText } = render(
    <QuestionDate
      question={question}
      useForm={{
        control: control,
        formState: { errors: {} },
        register: () => {},
        setValue: jest.fn()
      }}
    />
  )
  const datepicker = getByPlaceholderText('dd/mm/yyyy')
  fireEvent.change(datepicker, { target: { value: '11-11-2011' } })
  fireEvent.click(datepicker)
  fireEvent.keyDown(datepicker, { key: 'Enter', code: 13 })
  expect(datepicker.value).toBe('11/11/2011')
})

test('calendar is in spanish', () => {
  const { getByPlaceholderText } = render(
    <QuestionDate
      question={question}
      language='es'
      useForm={{
        control: control,
        formState: { errors: {} },
        register: () => {}
      }}
    />
  )
  const calendar = getByPlaceholderText('dd/mm/yyyy')

  fireEvent.click(calendar)

  expect(screen.getByText('Enero 2000', { exact: false })).toBeTruthy()
})

test('calendar is in french', () => {
  const { getByPlaceholderText } = render(
    <QuestionDate
      question={question}
      language='fr'
      useForm={{
        control: control,
        formState: { errors: {} },
        register: () => {}
      }}
    />
  )
  const calendar = getByPlaceholderText('dd/mm/yyyy')

  fireEvent.click(calendar)

  expect(screen.getByText('janvier 2000', { exact: false })).toBeTruthy()
})

test('calendar is in french', () => {
  const { getByPlaceholderText } = render(
    <QuestionDate
      question={question}
      language='de'
      useForm={{
        control: control,
        formState: { errors: {} },
        register: () => {}
      }}
    />
  )
  const calendar = getByPlaceholderText('dd/mm/yyyy')

  fireEvent.click(calendar)

  expect(screen.getByText('januar 2000', { exact: false })).toBeTruthy()
})

test('calendar sending no-valid language', () => {
  const { getByPlaceholderText } = render(
    <QuestionDate
      question={question}
      language='qwerty'
      useForm={{
        control: control,
        formState: { errors: {} },
        register: () => {}
      }}
    />
  )
  const calendar = getByPlaceholderText('dd/mm/yyyy')

  fireEvent.click(calendar)

  expect(screen.getByText('january 2000', { exact: false })).toBeTruthy()
})
