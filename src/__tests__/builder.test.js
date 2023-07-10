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

describe('form builder without custom errors', () => {
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
    const input = component.getByText('input label')
    const description = component.getByText(
      'Password must be 8-20 characters long'
    )

    expect(input).not.toBe(null)
    expect(description).not.toBe(null)
  })

  test('check if questions are rendered', () => {
    const allInputs = component.getAllByTestId('question-input')
    expect(allInputs.length).toBe(3)
    expect(allInputs[0].value).toBe('')
    expect(allInputs[1].value).toBe('')
    expect(allInputs[2].value).toBe('')
  })

  test('check if it calls submit eventhandler once only when required fields are filled in', async () => {
    const button = component.getByText('Submit')
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(0)

    const inputComponents = component.getAllByTestId('question-input')
    fireEvent.change(inputComponents[0], { target: { value: 'name testing' } })
    expect(inputComponents[0].value).toBe('name testing')

    fireEvent.change(inputComponents[1], { target: { value: 'password' } })
    expect(inputComponents[1].value).toBe('password')

    fireEvent.change(inputComponents[2], { target: { value: 'password' } })
    expect(inputComponents[2].value).toBe('password')

    const select = component.getByText('Country')
    selectEvent.openMenu(select)
    await fireEvent.keyDown(select, { key: 'Enter', code: 13 })
    expect(screen.getAllByText('Spain')).toBeTruthy()

    const checkboxes = component.getAllByTestId('question-checkbox')
    await act(async () => {
      fireEvent.click(checkboxes[0])
    })
    expect(checkboxes[0].checked).toEqual(true)

    await act(async () => {
      fireEvent.click(button)
    })
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})

describe('form builder with custom errors', () => {
  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <FormBuilder
        idForm={forms.contact.id}
        form={forms.contact}
        isoCode='ES'
        onSubmit={mockHandler}
        formErrors={[{ field: 'confirmpassword', type: 'doesNotMatch' }]}
      />
    )
  })

  afterEach(cleanup)

  test('check if component renders custom formErrors', () => {
    const doesNotMatchError = component.getByText('The passwords do not match')

    expect(doesNotMatchError).not.toBe(null)
  })
})
