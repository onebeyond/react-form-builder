/** @jsxRuntime classic */
/** @jsx jsx */
import { Input as InputUI, jsx } from 'theme-ui'

import React from 'react'

const Input = React.forwardRef(({ ...props }, ref) => {
  return <InputUI ref={ref} {...props} />
})

export default Input
