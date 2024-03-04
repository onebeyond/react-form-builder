/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { jsx, ThemeProvider, merge } from 'theme-ui'
import { FormTheme } from '@onebeyond/react-form-builder'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import App from './App'
import Contact from './forms/Contact'
import Countries from './forms/Countries'
import ErrorPage from './error-page'
import theme from './theme'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'countries',
        element: <Countries />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={merge(FormTheme, theme)}>
    <RouterProvider router={router} />
  </ThemeProvider>
)
