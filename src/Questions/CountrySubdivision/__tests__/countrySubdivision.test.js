import React from 'react'
import {
  cleanup,
  render,
  renderHook
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { useForm, FormProvider } from 'react-hook-form'

import QuestionCountrySubdivision from '..'

import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

afterEach(cleanup)

const { result } = renderHook(() => useForm())
const formMethods = result.current

const countryIsoCode = 'ES'

const setup = (question, extendedFormMethods = {}) => {
  const methods = { ...formMethods, ...extendedFormMethods }
  return render(
    <FormProvider{...methods}>
      <QuestionCountrySubdivision
        question={question}
      />
    </FormProvider>
  )
}

test('shows an error message if the field is required but doesn\'t have a value', () => {
  const question = {
    "name": "country_subdivisions",
    "placeholder": "Select your region",
    "type": "country_subdivision",
    "label": "Region",
    "errorMessages": {
      "required": "This field is required"
    },
    "registerConfig": {
      "required": true
    },
    "config": {
      countryIsoCode
    }
  }
  const extendedFormMethods = {
    formState: {
      errors: {
        [question.name]: {
          type: 'required'
        }
      }
    }
  }

  const { getByText } = setup(question, extendedFormMethods)

  expect(getByText(question.errorMessages.required)).toBeTruthy()
})
