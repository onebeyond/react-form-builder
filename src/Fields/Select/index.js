/** @jsx jsx */
import { Select as SelectUI, jsx } from 'theme-ui'

import React from 'react'

const Select = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <SelectUI key={ref} ref={ref} {...props}>
      {children}
    </SelectUI>
  )
})

export default Select
