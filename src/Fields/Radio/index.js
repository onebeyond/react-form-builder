/** @jsxRuntime classic */
/** @jsx jsx */
import { Radio as RadioUI, jsx } from 'theme-ui'

import React from 'react'

const Radio = React.forwardRef(({ ...props }, ref) => {
  return <RadioUI ref={ref} {...props} />
})
export default Radio
