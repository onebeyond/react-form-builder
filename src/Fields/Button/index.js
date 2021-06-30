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

const spinnerStyles = {
  width: '24px',
  height: '24px'
}

const Button = React.forwardRef(
  ({ disabled, caption, isLoading, id, ...props }, ref) => (
    <ButtonUI
      ref={ref}
      {...props}
      sx={{
        ...defaultStyles,
        ...(disabled && { background: 'gray' }),
        variant: id ? `buttons.${id}` : 'buttons.primary'
      }}
    >
      {isLoading ? (
        <Spinner sx={{ ...spinnerStyles }} data-cy='button-loading' />
      ) : (
        caption
      )}
    </ButtonUI>
  )
)

export default Button
