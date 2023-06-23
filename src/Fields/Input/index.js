/** @jsxRuntime classic */
/** @jsx jsx */
import { Input as InputUI, jsx } from 'theme-ui'

import React from 'react'

const Input = React.forwardRef(({ ...props }, ref) => {
  const { 'data-haserrors': haserrors } = props
  return (
    <InputUI ref={ref} {...props} className={haserrors ? 'error-input' : ''} />
  )
})

export default Input
