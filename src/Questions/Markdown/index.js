/** @jsx jsx */
/** @jsxRuntime classic */
import { Link, jsx } from 'theme-ui'
import ReactMarkdown from 'react-markdown'

const QuestionMarkdown = ({
  component,
  currentPath,
  form,
  question,
  useForm
}) => {
  const CustomComponent = ({ component }) => component(question, useForm)

  return component ? (
    <CustomComponent component={component} />
  ) : (
    <div
      key={question.name}
      sx={{
        variant: question.id
          ? 'forms.markdownContainer.' + (form && form.layout) + question.id
          : 'forms.markdownContainer.' + (form && form.layout)
      }}
    >
      <ReactMarkdown
        sx={{ variant: 'forms.markdown.' + (form && form.layout) }}
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
  )
}

export default QuestionMarkdown
