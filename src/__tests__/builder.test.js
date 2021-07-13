import React from 'react'
import { cleanup, render, fireEvent, screen } from '@testing-library/react'
import forms from './forms.json'
import FormBuilder from '../builder'

import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

let component = null
let mockHandler = null

beforeEach(() => {
  component = render(
    <FormBuilder
      idForm={forms.contact.id}
      form={forms.contact}
      isoCode='ES'
      onSubmit={mockHandler}
      //   onLinkOpen={onLinkOpen}
      //   isLoading={isLoading}
    />
  )
})

afterEach(cleanup)

test('check if component is rendered', () => {
  component.getByText('input label')
})

test('check if questions are rendered', () => {
  const allInputs = component.getAllByTestId('question-input')
  expect(allInputs[0].value).toBe('')
})

test('clicking the submit button calls eventhandler once', () => {
  mockHandler = jest.fn()
  const button = component.getByText('Submit')
  fireEvent.click(button)
  screen.debug()
  expect(mockHandler).toHaveBeenCalledTimes(1)
})
