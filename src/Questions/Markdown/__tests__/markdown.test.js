import React from 'react'
import { render, screen } from '@testing-library/react'
import QuestionMarkdown from '../'

describe('Without links included', () => {
  let component

  const question = {
    name: 'myMarkdown',
    label: 'This is the label of checkbox'
  }

  beforeEach(() => {
    component = render(<QuestionMarkdown question={question} />)
  })

  test('Check if component is rendered', () => {
    expect(component).toBeTruthy()
  })

  test('Check if label exists', () => {
    component.getByText(question.label)
  })
})

describe('With links included', () => {
  let component

  const question = {
    name: 'myMarkdown',
    label: 'This is the label of checkbox [privacy](#privacy)'
  }

  beforeEach(() => {
    component = render(<QuestionMarkdown question={question} />)
  })

  test('Check if component is rendered', () => {
    expect(component).toBeTruthy()
  })

  test('Check if hyperlink href was created', () => {
    expect(screen.getByRole('link').href).toMatch(/#\w+$/i)
  })
})
