import React from 'react'
import Select from './'

export default {
  title: 'Question/Select',
  component: Select,
  argTypes: {
    name: {
      type: { name: 'string', required: true },
      description: 'Name of the select component',
      table: {
        type: { summary: 'string' }
      }
    },
    label: {
      type: { name: 'string' },
      description:
        'Text shown with the select. This text can be written in markdown style',
      table: {
        type: { summary: 'string' }
      }
    },
    placeholder: {
      type: { name: 'string' },
      description: 'The text that will be shown as placeholder in the select',
      table: {
        type: { summary: 'string' }
      }
    },
    component: {
      description: 'Customized select component',
      table: {
        type: { summary: 'func component' },
        defaultValue: { summary: '() => {}' }
      }
    },
    config: {
      description: '',
      table: {
        type: { summary: 'json' },
        category: 'configuration'
      }
    },
    options: {
      description:
        'Array of objects with the key value and label for each option that we want in the select',
      table: {
        type: { summary: 'string' },
        category: 'configuration'
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
        'error message to display on submit if there is no selection',
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
      description: 'Define if the country select is required or not',
      table: {
        type: { summary: 'boolean' },
        category: 'registerConfig',
        defaultValue: { summary: false }
      }
    }
  }
}

const question = {
  name: 'Gender',
  type: 'select',
  placeholder: 'Please make a selection',
  label: 'What is your gender?',
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: true
  },
  config: {
    options: [
      {
        value: 'female',
        label: 'Female'
      },
      {
        value: 'male',
        label: 'Male'
      },
      {
        value: 'prefer_not_say',
        label: 'Prefer not to say'
      }
    ]
  }
}

const Template = (args) => (
  <Select
    question={args}
    useForm={{ errors: {}, register: () => {}, setValue: () => {} }}
  />
)

const ErrorSelect = (args) => (
  <Select
    question={args}
    useForm={{
      errors: { [question.name]: { type: 'required' } },
      register: () => {},
      setValue: () => {}
    }}
  />
)

export const defaultSelect = Template.bind({})
export const errorSelect = ErrorSelect.bind({})

defaultSelect.args = question
errorSelect.args = question
