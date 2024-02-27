import React from 'react'
import ReactDOM from 'react-dom/client'

import Contact from './index'

it.skip('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.createRoot(<Contact />, div)
  ReactDOM.unmountComponentAtNode(div)
})
