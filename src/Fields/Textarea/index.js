/** @jsxRuntime classic */
/** @jsx jsx */
import { Textarea as TextareaUI, jsx } from 'theme-ui'

import React, { useState } from 'react'

const Textarea = React.forwardRef(({ ...props }, ref) => {
  const [count, setCount] = useState(0)
  return (
    <>
      <TextareaUI
        ref={ref}
        {...props}
        onChange={(e) => {
          if (props.countType === 'word')
            setCount(e.target.value.trim().split(' ').length)
          // By default is char count
          else setCount(e.target.value.length)
        }}
      />
      {props?.maximumLen && (
        <span>
          {count}/{props?.maximumLen}
        </span>
      )}
    </>
  )
})

export default Textarea
