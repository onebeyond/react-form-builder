import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider } from 'theme-ui'
import { ExampleTheme } from 'react-form-builder'

ReactDOM.render(
  <ThemeProvider theme={ExampleTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
