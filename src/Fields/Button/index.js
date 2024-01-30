/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { Button as ButtonUI, Spinner, jsx } from 'theme-ui'

import styles from './styles.js'

const Button = React.forwardRef(
  ({ disabled, caption, isLoading, id, ...props }, ref) => (
    <ButtonUI
      ref={ref}
      {...props}
      sx={{
        ...styles.default,
        ...(disabled && { background: 'gray' }),
        variant: id ? `forms.buttons.${id}` : 'forms.buttons.default'
      }}
    >
      {isLoading ? (
        <Spinner sx={{ ...styles.spinner }} data-cy='button-loading' />
      ) : (
        caption
      )}
    </ButtonUI>
  )
)

export default Button
