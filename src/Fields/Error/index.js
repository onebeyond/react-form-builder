import React from 'react'
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'

const defaultStyles = {
  color: '#a8000b',
  m: 0,
  mt: '0.25rem',
  fontSize: '14px'
}

const ErrorMessage = React.forwardRef(
  ({ message, name, errorStyles, ...props }, ref) => {
    return (
      <p
        id={'error_message_' + name}
        className='error-message'
        ref={ref}
        sx={{ ...defaultStyles, ...errorStyles, variant: 'forms.errorMessage' }}
        {...props}
      >
        {message}
      </p>
    )
  }
)

export default ErrorMessage
