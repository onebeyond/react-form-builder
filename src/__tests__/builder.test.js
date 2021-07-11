import React from 'react'
import { cleanup, render } from '@testing-library/react'
import forms from '../../example/src/forms.json'
import FormBuilder from '../builder'

import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

let component = null

beforeEach(() => {
  const mockHandler = jest.fn()
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
