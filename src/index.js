/** @jsx jsx */

import { Button as ButtonUI, Spinner, jsx } from 'theme-ui'

import React from 'react'

// export { default as Button } from './Fields/Button'
export { default as ExampleTheme } from './theme'

const defaultStyles = {
  border: 'transparent',
  color: 'primaryText',
  fontSize: 2,
  fontWeight: 'buttons',
  lineHeight: 1,
  borderRadius: 0,
  backgroundColor: 'grGreen',
  p: '12px',
  cursor: 'pointer',
  width: '100%'
}

export const Button = React.forwardRef(
  ({ disabled, variant, caption, isLoading, ...props }, ref) => (
    <ButtonUI
      ref={ref}
      {...props}
      sx={{ ...defaultStyles, ...(disabled && { background: 'gray' }) }}
      variant={variant}
    >
      {caption}
      {isLoading && <Spinner data-cy='button-loading' />}
    </ButtonUI>
  )
)

export const ExampleComponent = ({ text }) => {
  return (
    <div
      sx={{
        fontWeight: 'bold',
        fontSize: 4,
        color: 'primary'
      }}
    >
      Example Component: {text}
    </div>
  )
}
