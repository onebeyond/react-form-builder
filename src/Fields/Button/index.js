/** @jsxRuntime classic */
/** @jsx jsx */
import { Button as ButtonUI, Spinner, jsx } from 'theme-ui'

import React from 'react'

const spinnerStyles = {
  width: '24px',
  height: '24px'
}

const Button = React.forwardRef(
  ({ disabled, caption, isLoading, id, theme, ...props }, ref) => (
    <ButtonUI
      ref={ref}
      {...props}
      sx={
        ({
          ...(disabled && { background: 'gray' })
        },
        id ? theme[id] : theme?.default)
      }
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
