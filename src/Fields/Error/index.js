import React from 'react'
/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const defaultStyles = {
  color: '#a8000b',
  m: 0,
  mt: '0.25rem',
  fontSize: '14px'
}

const ErrorMessage = React.forwardRef(({ message, ...props }, ref) => {
  return (
    <p className='error-message' ref={ref} sx={defaultStyles} {...props}>
      {message}
    </p>
  )
})

export default ErrorMessage
