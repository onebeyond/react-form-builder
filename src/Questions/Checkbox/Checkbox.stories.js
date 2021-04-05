import React from 'react'
import Checkbox from '.'
import Label from '../../Fields/Label'

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
    component: {
      description: 'Customization of the checkbox',
      table: {
        type: { summary: 'func component' }, // TODO
        defaultValue: { summary: '() => {}' }
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
      }
    }
  }
}

const question = {
  name: 'terms_and_conditions',
  isFullWidth: false,
  label:
    'I am over the age of 18, a United Kingdom resident and I have read and understood the Terms and Conditions of this promotion.',
  defaultChecked: false,
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: false
  }
}

const customQuestion = { ...question }
customQuestion.label = ''

const customElement = () => {
  return (
    <div>
      <Label sx={{ alignItems: 'center' }}>
        <Checkbox
          question={customQuestion}
          useForm={{ errors: {}, register: () => {} }}
        />
        <p>Customized checkbox with an image:</p>
        <img
          style={{ height: '40px', marginLeft: '10px' }}
          src='https://images.ctfassets.net/5gv1edeicqfs/48EM0LU3Z6gWkQCcCaeoq2/704ea273b5d50d09ff450a5ceaa74631/guidesmiths-logo.png' // TODO
          alt='Logo GS'
        />
      </Label>
    </div>
  )
}

const Template = (args) => (
  <Checkbox question={args} useForm={{ errors: {}, register: () => {} }} />
)

const Error = (args) => (
  <Checkbox
    question={args}
    useForm={{
      errors: {
        [question.name]: {
          type: 'required'
        }
      },
      register: () => {}
    }}
  />
)

const Linked = (args) => (
  <Checkbox question={args} useForm={{ errors: {}, register: () => {} }} />
)

const Customized = (args) => (
  <Checkbox
    question={args}
    useForm={{ errors: {}, register: () => {} }}
    component={customElement}
  />
)

export const defaultCheckbox = Template.bind({})

export const errorCheckbox = Error.bind({})

export const checkboxWithLink = Linked.bind({})

export const customCheck = Customized.bind({})

const errorQuestion = { ...question }
const linkQuestion = { ...question }

errorQuestion.registerConfig.required = true
linkQuestion.label =
  '[Text with a link](https://www.npmjs.com/package/@guidesmiths/react-form-builder)'

defaultCheckbox.args = question
errorCheckbox.args = errorQuestion
checkboxWithLink.args = linkQuestion
customCheck.args = customQuestion
