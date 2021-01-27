import Input from '.'
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { storiesOf } from '@storybook/react'
import { theme } from '../../../../styles'

storiesOf('Commons | Fields').add('Input', () => {
  return (
    <ThemeProvider theme={theme}>
      <Input defaultValue="Hello" />
    </ThemeProvider>
  )
})
