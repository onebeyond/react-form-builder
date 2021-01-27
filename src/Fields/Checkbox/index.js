/** @jsx jsx */
/** @jsxRuntime classic */
import { Checkbox as CheckboxUI, jsx } from 'theme-ui'

import React from 'react'

const Checkbox = React.forwardRef(({ ...props }, ref) => {
  return <CheckboxUI ref={ref} {...props} />
})

export default Checkbox
