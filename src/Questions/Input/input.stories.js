import React from 'react'
import Input from './'

export default {
  title: 'Question/Input',
  component: Input,
  argTypes: {
    name: {
      type: { name: 'string', required: true },
      description: 'Name of the Input component',
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
      description: 'The text that will be shown as placeholder in the input',
      table: {
        type: { summary: 'string' }
      }
    },
    component: {
      description: 'Customization of the input',
      table: {
        type: { summary: 'func component' },
        defaultValue: { summary: '() => {}' }
      }
    },
    icon: {
      description: 'icon that will be displayed with the input',
      table: {
        type: { summary: 'json' },
        category: 'icon'
      }
    },
    nameIcon: {
      name: 'name',
      description: 'name of the icon that we want to be displayed',
      table: {
        type: { summary: 'string' },
        category: 'icon'
      }
    },
    fill: {
      description: 'the icon color',
      table: {
        type: { summary: 'string' },
        category: 'icon'
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
        'error message to display on submit if the input is not filled',
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
      description: 'Define if the input is required or not',
      table: {
        type: { summary: 'boolean' },
        category: 'registerConfig',
        defaultValue: { summary: false }
      }
    },
    patternError: {
      name: 'pattern',
      description: 'Define if the pattern is needed or not',
      table: {
        type: { summary: 'boolean' },
        category: 'registerConfig',
        defaultValue: { summary: false }
      }
    },
    pattern: {
      description: 'Define the pattern to be checked in this input',
      table: {
        type: { summary: 'pattern' },
        category: 'registerConfig',
        defaultValue: { summary: '' }
      }
    }
  }
}

const question = {
  name: 'inputName',
  type: 'input',
  label: 'input label',
  placeholder: 'input placeholder',
  errorMessages: {
    required: 'This field is required',
    pattern: 'This is not the right pattern'
  },
  registerConfig: {
    required: true
  }
}

const questionIcon = {
  name: 'inputName',
  type: 'input',
  label: 'input label',
  placeholder: 'input placeholder',
  icon: {
    name: 'question-circle',
    fill: 'red'
  },
  tooltip: {
    text: 'tooltip text example',
    config: {
      backgroundColor: 'green'
    }
  },
  errorMessages: {
    required: 'This field is required',
    pattern: 'This is not the right pattern'
  },
  registerConfig: {
    required: true
  }
}

const patternQuestion = { ...question }
patternQuestion.registerConfig.pattern =
  '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])'

const Template = (args) => (
  <Input
    question={args}
    useForm={{
      errors: {},
      register: () => {},
      setValue: () => {}
    }}
  />
)

const errorTemplate = (args) => (
  <Input
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

const patternTemplate = (args) => (
  <Input
    question={args}
    useForm={{
      errors: {
        [question.name]: {
          type: 'pattern'
        }
      },
      register: () => {},
      setValue: () => {}
    }}
  />
)

const iconTemplate = (args) => (
  <Input
    question={args}
    useForm={{
      errors: {},
      register: () => {},
      setValue: () => {}
    }}
  />
)

export const defaultInput = Template.bind()
export const inputError = errorTemplate.bind()
export const inputPatternError = patternTemplate.bind()
export const inputIcon = iconTemplate.bind()

defaultInput.args = question
inputError.args = question
inputPatternError.args = patternQuestion
inputIcon.args = questionIcon
