import React from 'react'
import { cleanup, render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import forms from './forms.json'
import FormBuilder from '../builder'
import { act } from 'react-dom/test-utils'
import selectEvent from 'react-select-event'
import MutationObserver from '@sheerun/mutationobserver-shim'

window.MutationObserver = MutationObserver

let component = null
let mockHandler = null
// const isLoading = false
let loaderc = false
// function useLoading(isLoading) {
//   isLoading = true
//   return { isLoading }
// }

beforeEach(() => {
  mockHandler = jest.fn().mockImplementation(() => {
    loaderc = true
  })
  // mockHandler = jest.fn(() => renderHook(() => useLoading(isLoading)))
  component = render(
    <FormBuilder
      idForm={forms.contact.id}
      form={forms.contact}
      isoCode='ES'
      isLoading={false}
      onSubmit={mockHandler}
      // validateJSON
    />
  )
})
afterEach(cleanup)

test('check if questions are rendered', () => {
  const allInputs = component.getAllByTestId('question-input')
  expect(allInputs.length).toBe(1)
})

test("check if it won't call submit eventhandler if required fields are not filled in", async () => {
  const button = component.getByText('Submit Form')
  fireEvent.click(button)
  expect(mockHandler).toHaveBeenCalledTimes(0)
})

test('check if it calls submit eventhandler once only when required fields are filled in', async () => {
  const button = component.getByText('Submit Form')

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

test('check if spinner is visible after submitting form', async () => {
  const { rerender } = component
  const button = component.getByText('Submit Form')

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
  rerender(
    <FormBuilder
      idForm={forms.contact.id}
      form={forms.contact}
      isoCode='ES'
      isLoading={loaderc}
      onSubmit={mockHandler}
    />
  )
  expect(screen.queryByText('Submit Form')).not.toBeInTheDocument()
})
