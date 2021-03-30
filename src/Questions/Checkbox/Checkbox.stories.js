import React from 'react'
import Checkbox from '../Checkbox'

export default {
  title: 'Question/Checkbox',
  component: Checkbox,
  argTypes: {
    name: {
      type: { name: 'string', required: true },
      description: 'Name of the checkbox',
      table: {
        type: { summary: 'string' }
      }
    },
    isFullWidth: {
      type: { name: 'boolean' },
      description:
        'Define if the field takes all the available width in the grid or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    label: {
      type: { name: 'string' },
      description:
        'Text shown next to the checkbox. This text can be written in markdown style',
      table: {
        type: { summary: 'string' }
      }
    },
    defaultChecked: {
      type: { name: 'boolean' },
      description: 'Check the input by default',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
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
        'error message to display on submit if the checkbox is not checked',
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
      description: 'Define if the checkbox is required or not',
      table: {
        type: { summary: 'boolean' },
        category: 'registerConfig',
        defaultValue: { summary: false }
      },
      control: {
        type: 'boolean'
      }
    }
  }
}

const question = {
  name: 'terms_and_conditions',
  isFullWidth: false,
  label:
    'I am over the age of 18, a United Kingdom resident and I have read and understood the [Terms and Conditions](TC) of this promotion.',
  defaultChecked: false,
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: false
  }
}
const Template = (args) => (
  <Checkbox question={question} useForm={{ errors: {}, register: () => {} }} />
)

export const Primary = Template.bind({})

Primary.args = {
  name: 'terms_and_conditions',
  label:
    'I am over the age of 18, a United Kingdom resident and I have read and understood the [Terms and Conditions](TC) of this promotion.',
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: true
  }
}
