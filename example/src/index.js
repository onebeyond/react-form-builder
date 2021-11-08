import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, merge } from 'theme-ui'
import { ExampleTheme } from 'react-form-builder'

import App from './App'
import theme from './theme'

ReactDOM.render(
  <ThemeProvider theme={merge(ExampleTheme, theme)}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
