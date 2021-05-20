import React from 'react'
import Date from './'
import 'react-datepicker/dist/react-datepicker.css'

export default {
  title: 'Question/Date',
  component: Date,
  argTypes: {
    name: {
      type: { name: 'string', required: true },
      description: 'Name of the Date component',
      table: {
        type: { summary: 'string' }
      }
    },
    label: {
      type: { name: 'string' },
      description: 'Text shown with the input.',
      table: {
        type: { summary: 'string' }
      }
    },
    placeholder: {
      type: { name: 'string' },
      description:
        'The text that will be shown as placeholder in the date input',
      table: {
        type: { summary: 'string' }
      }
    },
    component: {
      description:
        'Custom component that will replace  the default date component',
      table: {
        type: { summary: 'func component' },
        defaultValue: { summary: '() => {}' }
      }
    },
    minAge: {
      description:
        'the minimun age that the user should have, the calendar will be opened in that date',
      table: {
        type: { summary: 'int' }
      }
    },
    dateFormat: {
      description: 'the format that we want in the dates',
      table: {
        type: { summary: 'string' }
      }
    },
    errorMessages: {
      description: '',
      table: {
        type: { summary: 'json' },
        category: 'errorMessages'
      }
    },
    requiredError: {
      name: 'required',
      description:
        'error message to display on submit if a date is not selected',
      table: {
        type: { summary: 'string' },
        category: 'errorMessages'
      }
    },
    underAge: {
      description:
        'error message to display is the date selected is under minAge attribute',
      table: {
        type: { summary: 'string' },
        category: 'errorMessages'
      }
    },
    registerConfig: {
      description: '',
      table: {
        type: { summary: 'json' },
        category: 'registerConfig'
      }
    },
    required: {
      description: 'Define if the date is required or not',
      table: {
        type: { summary: 'boolean' },
        category: 'registerConfig',
        defaultValue: { summary: false }
      }
    }
  }
}

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

const openToQuestion = { ...question }
const openOnBirthDateQuestion = { ...question }
const errorUnderAgeQuestion = JSON.parse(JSON.stringify(question))
const placeholderQuestion = { ...question }
const formatQuestion = { ...question }

openToQuestion.openToDate = '1-1-2000'

openOnBirthDateQuestion.minAge = 18

errorUnderAgeQuestion.errorMessages.underAge =
  'you dont have the required minimum age'

placeholderQuestion.placeholder = 'date place holder'

formatQuestion.dateFormat = 'dd-MM-yyyy'
formatQuestion.placeholder = 'dd-mm-yyyy'

const Template = (args) => (
  <Date
    question={args}
    useForm={{ errors: {}, register: () => {}, setValue: () => {} }}
  />
)

const openToDateTemplate = (args) => (
  <Date
    question={args}
    useForm={{ errors: {}, register: () => {}, setValue: () => {} }}
  />
)

const openOnBirthdateTemplate = (args) => (
  <Date
    question={args}
    useForm={{ errors: {}, register: () => {}, setValue: () => {} }}
  />
)

const requiredErrorTemplate = (args) => (
  <Date
    question={args}
    useForm={{
      errors: {
        [question.name]: {
          type: 'required'
        }
      },
      register: () => {},
      setValue: () => {}
    }}
  />
)

const underAgeErrorTemplate = (args) => (
  <Date
    question={args}
    useForm={{
      errors: {
        [question.name]: {
          type: 'underAge'
        }
      },
      register: () => {},
      setValue: () => {}
    }}
  />
)

const placerholderTemplate = (args) => (
  <Date
    question={args}
    useForm={{ errors: {}, register: () => {}, setValue: () => {} }}
  />
)

const dateFormatTemplate = (args) => (
  <Date
    question={args}
    useForm={{ errors: {}, register: () => {}, setValue: () => {} }}
  />
)

export const defaultDate = Template.bind()
export const placeholderDate = placerholderTemplate.bind()
export const openToDate = openToDateTemplate.bind()
export const openWithBirthDate = openOnBirthdateTemplate.bind()
export const requiredErrorDate = requiredErrorTemplate.bind()
export const underAgeErrorDate = underAgeErrorTemplate.bind()
export const formatDate = dateFormatTemplate.bind()

defaultDate.args = question
openToDate.args = openToQuestion
openWithBirthDate.args = openOnBirthDateQuestion
requiredErrorDate.args = question
underAgeErrorDate.args = errorUnderAgeQuestion
placeholderDate.args = placeholderQuestion
formatDate.args = formatQuestion
