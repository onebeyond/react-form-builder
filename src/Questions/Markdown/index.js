/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'
import ReactMarkdown from '../../Fields/Markdown'

const QuestionMarkdown = ({
  component,
  currentPath,
  form,
  question,
  useForm,
  onLinkOpen
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
        onLinkOpen={onLinkOpen}
      />
    </div>
  )
}

export default QuestionMarkdown
