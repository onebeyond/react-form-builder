/** @jsxRuntime classic */
/** @jsx jsx */
import { Button as ButtonUI, Spinner, jsx } from 'theme-ui'

import React from 'react'

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

const Button = React.forwardRef(
  ({ disabled, variant = 'primary', caption, isLoading, ...props }, ref) => (
    <ButtonUI
      ref={ref}
      {...props}
      sx={{
        ...defaultStyles,
        ...(disabled && { background: 'gray' }),
        variant: `buttons.${variant}`
      }}
    >
      {caption}
      {isLoading && <Spinner data-cy='button-loading' />}
    </ButtonUI>
  )
)

export default Button
