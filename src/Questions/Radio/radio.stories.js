import React from 'react'
import RadioButton from './'

export default {
  title: 'Question/RadioButton',
  component: RadioButton,
  argTypes: {
    name: {
      type: { name: 'string', required: true },
      description: 'Name of the RadioButtons component',
      table: {
        type: { summary: 'string' }
      }
    },
    label: {
      type: { name: 'string' },
      description:
        'Text to show  like the question text, this text can be written in markdown format.',
      table: {
        type: { summary: 'string' }
      }
    },
    component: {
      description:
        'Customized componet to show instead of traditional radio button',
      table: {
        type: { summary: 'func component' },
        defaultValue: { summary: '() => {}' }
      }
    },
    options: {
      type: { name: 'Object Array' },
      description:
        'Object array that will contain all the options that you want in the radio buttons component',
      table: {
        type: { summary: 'Object Array' },
        category: 'options'
      }
    },
    value: {
      description: 'the value of the option',
      table: {
        category: 'options'
      }
    },
    labelOption: {
      name: 'label',
      description: 'the label displayed with the option',
      table: {
        category: 'options'
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
        'error message to display on submit if the no radio button is selected',
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
      description: 'Define if the radiobutton is required or not',
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
    }
  }
}

const question = {
  name: 'radio_button_name',
  label: 'Este es el texto de la pregunta',
  type: 'radio',
  options: [
    {
      value: true,
      label: 'YES'
    },
    {
      value: false,
      label: 'NOP'
    }
  ],
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: true
  }
}

const questionMarkdown = { ...question }
questionMarkdown.label = '**Esto es un texto con markdown**'

const Template = (args) => (
  <RadioButton question={args} useForm={{ errors: {}, register: () => {} }} />
)

const markdownTemplate = (args) => (
  <RadioButton question={args} useForm={{ errors: {}, register: () => {} }} />
)

const errorTemplate = (args) => (
  <RadioButton
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

export const defaultRadio = Template.bind({})
export const markdownText = markdownTemplate.bind({})
export const errorRadio = errorTemplate.bind({})

defaultRadio.args = question
markdownText.args = questionMarkdown
errorRadio.args = question
