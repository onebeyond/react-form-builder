/** @jsxRuntime classic */
/** @jsx jsx */
import { Textarea as TextareaUI, jsx } from 'theme-ui'

import React from 'react'

const Textarea = React.forwardRef(({ ...props }, ref) => {
  return <TextareaUI ref={ref} {...props} />
})

export default Textarea
