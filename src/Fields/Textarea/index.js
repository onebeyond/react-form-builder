/** @jsxRuntime classic */
/** @jsx jsx */
import { Textarea as TextareaUI, jsx } from 'theme-ui'

import React, { useState } from 'react'

const Textarea = React.forwardRef(({ countType, maximumLen, ...props }, ref) => {
  const [count, setCount] = useState(0)
  const { 'data-haserrors': haserrors } = props

  return (
    <>
      <TextareaUI
        ref={ref}
        className={haserrors ? 'error-input' : ''}
        {...props}
        onChange={(e) => {
          if (countType === 'word')
            setCount(e.target.value.trim().split(/[\s,.\n]+/).length)
          // By default is char count
          else setCount(e.target.value.length)
        }}
      />
      {maximumLen && (
        <span>
          {count}/{maximumLen}
        </span>
      )}
    </>
  )
})

export default Textarea
