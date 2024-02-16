/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { jsx, ThemeProvider, merge } from 'theme-ui'
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
      gridColumnEnd: '3'
    },
    autoCompleteContainer: {
      gridColumnStart: '1',
      gridColumnEnd: '3'
    },
    selectImagesContainer: {
      '>div': {
        display: 'flex',
        maxWidth: '100%',
        flexWrap: 'wrap',
        gap: ['2px', '10px'],
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    selectImagesInput: {
      svg: {
        width: '10px',
        ':nth-of-type(2)': {
          color: 'transparent'
        },
        ':nth-of-type(1)': {
          color: 'transparent'
        }
      },
      'input:focus ~ svg': {
        color: 'transparent',
        backgroundColor: 'transparent'
      }
    }
  },
  label: {
    color: 'brown'
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={merge(ExampleTheme, theme)}>
    <App />
  </ThemeProvider>
)
