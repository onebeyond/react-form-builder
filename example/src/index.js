import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider, merge } from 'theme-ui'
import { ExampleTheme } from 'react-form-builder'

const theme = {
  buttons: {
    primary: {
      color: 'red'
    },
    customButton: {
      color: 'green'
    }
  }
}

ReactDOM.render(
  <ThemeProvider theme={merge(ExampleTheme, theme)}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
