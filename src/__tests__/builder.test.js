import React from 'react'
import { cleanup, render, fireEvent, screen } from '@testing-library/react'
import forms from './forms.json'
import FormBuilder from '../builder'
import { act } from 'react-dom/test-utils'
import selectEvent from 'react-select-event'

import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

let component = null
let mockHandler = null

beforeEach(() => {
  mockHandler = jest.fn()
  component = render(
    <FormBuilder
      idForm={forms.contact.id}
      form={forms.contact}
      isoCode='ES'
      onSubmit={mockHandler}
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

test('check if it calls submit eventhandler once only when required fields are filled in', async () => {
  const button = component.getByText('Submit')

  await act(async () => {
    fireEvent.click(button)
  })

  expect(mockHandler).toHaveBeenCalledTimes(0)

  const inputComponent = component.getAllByTestId('question-input')
  fireEvent.change(inputComponent[0], { target: { value: 'name testing' } })
  expect(inputComponent[0].value).toBe('name testing')

  const select = component.getByText('Country')
  selectEvent.openMenu(select)
  await fireEvent.keyDown(select, { key: 'Enter', code: 13 })
  expect(screen.getAllByText('Spain')).toBeTruthy()

  const checkboxes = component.getAllByTestId('question-checkbox')
  fireEvent.click(checkboxes[0])
  expect(checkboxes[0].checked).toEqual(true)

  await act(async () => {
    fireEvent.click(button)
  })
  expect(mockHandler).toHaveBeenCalledTimes(1)
})
