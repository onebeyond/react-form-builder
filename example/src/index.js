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
  },
  select: {
    backgroundColor: 'red',
    option: {
      color: 'purple',
      fontSize: '30px'
    },
    control: {
        backgroundColor: 'gray',
        borderRadius: '20px'
    }
  },
  forms: {
      container: {
        contact: {
            display: 'grid',
            backgroundColor: 'green'
        }
      },
      multipleImageCheckboxes: {
          contact: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr'
          }
      }
  },
  label: {
    color: 'brown'
  }
}

ReactDOM.render(
  <ThemeProvider theme={merge(ExampleTheme, theme)}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
