/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'
import ReactMarkdown from 'react-markdown'
import React from 'react'

const Markdown = React.forwardRef(({ ...props }, ref) => {
  return <ReactMarkdown ref={ref} {...props} />
})

export default Markdown
