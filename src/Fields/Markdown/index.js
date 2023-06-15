/** @jsxRuntime classic */
/** @jsx jsx */
import { Link, jsx } from 'theme-ui'
import ReactMarkdown from 'react-markdown'
import React from 'react'
let MarkDownLink = ''
const Markdown = React.forwardRef(({ modalLabel, ...props }, ref) => {
  MarkDownLink = ({ href, children }) => {
    const modalName = href.startsWith('#') && href.toString().substr(1)
    return (
      <Link
        href={`${href}`}
        target={modalName ? '_self' : '_blank'}
        {...(modalLabel ? `aria-label=${modalName} ${modalLabel}` : '')}
        {...(modalName ? { onClick: () => props.onLinkOpen(modalName) } : {})}
      >
        {children}
      </Link>
    )
  }

  return (
    <ReactMarkdown
      ref={ref}
      {...props}
      renderers={{
        link: MarkDownLink
      }}
    />
  )
})

export default Markdown
