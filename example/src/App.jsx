import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-phone-number-input/style.css'

import './styles.css'

const App = () => {
  return (
    <div style={{ display: 'flex' }}>
      <nav>
        <ul>
          <li>
            <Link to={'contact'}>Contact form</Link>
          </li>
          <li>
            <Link to={'countries'}>Countries form</Link>
          </li>
          <li>
            <Link to={'country_subdivisions'}>Country subdivision form</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
