import React, { useState } from 'react'
import Checkbox from '.'
import Label from '../../Fields/Label'

import Modal from '../../Fields/MyModal'

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
      description:
        'Custom component that will replace  the default checkbox component',
      table: {
        type: { summary: 'func component' },
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
const modalQuestion = { ...question }
const errorQuestion = { ...question }
const linkQuestion = { ...question }

customQuestion.label = ''
modalQuestion.label = 'click the [link](#privacy) to see a modal '
errorQuestion.registerConfig.required = true
linkQuestion.label =
  'Text with a [link](https://www.npmjs.com/package/@guidesmiths/react-form-builder)'

const customElement = () => {
  return (
    <div>
      <Label sx={{ alignItems: 'center' }}>
        <Checkbox
          question={customQuestion}
          name={customQuestion.name}
          useForm={{ errors: {}, register: () => {} }}
        />
        <p>Customized checkbox with an image:</p>
        <img
          style={{ height: '40px', marginLeft: '10px' }}
          src='https://images.ctfassets.net/5gv1edeicqfs/48EM0LU3Z6gWkQCcCaeoq2/704ea273b5d50d09ff450a5ceaa74631/guidesmiths-logo.png'
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

const ModalCheckbox = (args) => {
  const [show, setShow] = useState(false)
  function onLinkOpen() {
    setShow(true)
  }
  return (
    <React.Fragment>
      <Modal
        title={args.name}
        onClose={() => setShow(false)}
        show={show}
        modalText='this a  modal example privacy *markdown* **text** '
      />
      <Checkbox
        question={args}
        onLinkOpen={onLinkOpen}
        useForm={{ errors: {}, register: () => {} }}
      />
    </React.Fragment>
  )
}

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

export const modalTest = ModalCheckbox.bind({})

defaultCheckbox.args = question
errorCheckbox.args = errorQuestion
checkboxWithLink.args = linkQuestion
customCheck.args = customQuestion

modalTest.args = modalQuestion
