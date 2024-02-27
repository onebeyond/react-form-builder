import React from 'react'
import Country from '.'

export default {
  title: 'Question/Country',
  component: Country,
  argTypes: {
    name: {
      type: { name: 'string', required: true },
      description: 'Name of the country component',
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
    priorityOptions: {
      type: { name: 'Array' },
      description:
        'An  array of Strings with the name(s) of the countries that you want to be shown the first in the country list',
      table: {
        type: { summary: 'Array' }
      }
    },
    language: {
      type: { name: 'string' },
      description:
        'An string with the language shortcode in which you want to display the country names opt: es,en,fr,de',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'en' }
      }
    },
    countryAndRegionsData: {
      type: { name: 'object' },
      description:
        'An object or array of objects with the acronym(s) and the names of the countries that you want to be shown in the select.',
      table: {
        type: {
          summary: 'json'
        },
        defaultValue: { summary: '[]' },
        category: 'countryAndRegionsData'
      }
    },
    countryName: {
      type: { name: 'string' },
      description: 'The name of the country',
      table: {
        type: { summary: 'string' },
        category: 'countryAndRegionsData'
      }
    },
    countryShortCode: {
      type: { name: 'string' },
      description: 'The code/shortcut for the country',
      table: {
        type: { summary: 'string' },
        category: 'countryAndRegionsData'
      }
    },
    component: {
      description: 'Customization of the country select',
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
        'error message to display on submit if the country  is not selected',
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
  name: 'country_of_residence',
  label: 'This is the label of the country select',
  placeholder: 'Please select an option ^^',
  errorMessages: {
    required: 'This field is required'
  },
  registerConfig: {
    required: false
  }
}

const customListCountries = [
  { countryName: 'MyOwnCountry1', countryShortCode: 'MC1' },
  { countryName: 'MyOwnCountry2', countryShortCode: 'MC2' },
  { countryName: 'MyOwnCountry3', countryShortCode: 'MC3' },
  { countryName: 'MyOwnCountry4', countryShortCode: 'MC4' }
]

const customListCountryQst = { ...question }
customListCountryQst.priorityOptions = ['GB', 'ES']

const Template = (args) => (
  <Country
    question={args}
    useForm={{
      control: () => ({}),
      formState: { errors: {} },
      register: () => {},
      setValue: () => {}
    }}
  />
)

const errorTemplate = (args) => (
  <Country
    question={args}
    useForm={{
      control: () => ({}),
      formState: {
        errors: {
          [question.name]: {
            type: 'required'
          }
        }
      },
      register: () => {},
      setValue: () => {}
    }}
  />
)

const customOrderTemplate = (args) => (
  <Country
    question={args}
    useForm={{
      control: () => ({}),
      formState: { errors: {} },
      register: () => {},
      setValue: () => {}
    }}
  />
)

const customListCountriesTemplate = (args) => (
  <Country
    question={args}
    countryAndRegionsData={customListCountries}
    useForm={{
      control: () => ({}),
      formState: { errors: {} },
      register: () => {},
      setValue: () => {}
    }}
  />
)

const idiomChangedTemplate = (args) => (
  <Country
    question={args}
    language='es'
    useForm={{
      control: () => ({}),
      formState: { errors: {} },
      register: () => {},
      setValue: () => {}
    }}
  />
)
export const defaultCountry = Template.bind({})
export const errorCountry = errorTemplate.bind({})
export const customOrderCountries = customOrderTemplate.bind({})
export const customListCountry = customListCountriesTemplate.bind({})
export const idiomEsCountry = idiomChangedTemplate.bind({})

defaultCountry.args = question
errorCountry.args = question
customOrderCountries.args = customListCountryQst
customListCountry.args = question
idiomEsCountry.args = question
