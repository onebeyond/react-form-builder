import { Label as LabelUI, jsx } from 'theme-ui'

/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'

const Label = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <LabelUI ref={ref} {...props}>
      {children}
    </LabelUI>
  )
})

export default Label
