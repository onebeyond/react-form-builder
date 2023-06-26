import React from 'react'
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'

const defaultStyles = {
  m: 0,
  mt: '0.25rem',
  fontSize: '14px',
  display: 'list-item',
  listStyle: 'disc inside'
}

const FieldDescription = React.forwardRef(
  ({ descriptions, name, ...props }, ref) => {
    return descriptions.map((description, index) => (
      <p
        id={`description_${name}_${index}`}
        key={`description_${name}_${index}`}
        className='field-description'
        ref={ref}
        sx={{ ...defaultStyles, variant: 'forms.fieldDescription' }}
        {...props}
      >
        {description}
      </p>
    ))
  }
)

export default FieldDescription
