/** @jsx jsx */
/** @jsxRuntime classic */
import { Link, jsx } from 'theme-ui'
import ReactMarkdown from 'react-markdown'

const styles = {
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  }
}

const QuestionMarkdown = ({ question, form, currentPath }) => {
  return (
    <div
      sx={{
        ...(question.isFullWidth && styles.fullWidth)
      }}
    >
      <div
        sx={{
          variant: 'forms.markdown.container' + (form && form.layout)
        }}
      >
        <div sx={styles.centerStyle} key={question.name}>
          <ReactMarkdown
            sx={{ variant: 'forms.markdown' + (form && form.layout) }}
            source={question.label}
            renderers={{
              link: ({ href, children }) => (
                <Link href={`${currentPath}${href}`} target='_blank'>
                  {children}
                </Link>
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default QuestionMarkdown
