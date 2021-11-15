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
        backgroundColor: 'green',
        gridTemplateColumns: '1fr 1fr'
      }
    },
    multipleImageCheckboxes: {
      contact: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        label: {
          div: {
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '50%',
            cursor: 'pointer',
            height: '28px',
            left: '0',
            width: '28px',
            svg: {
              visibility: 'hidden'
            }
          }
        }
      }
    },
    selectContainer: {
      gridColumnStart: '1',
      gridColumnEnd: '3'
    },
    countryContainer: {
      gridColumnStart: '1',
      gridColumnEnd: '3'
    },
    inputContainer: {
      gridColumnStart: '1',
      gridColumnEnd: '3',
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
