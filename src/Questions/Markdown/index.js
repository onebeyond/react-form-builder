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
          ? 'forms.markdownContainer.' + question.id
          : 'forms.markdownContainer'
      }}
    >
      <ReactMarkdown
        sx={{ variant: 'forms.markdown' }}
        source={question.label}
        onLinkOpen={onLinkOpen}
        modalLabel={question.modalLabel}
      />
    </div>
  )
}

export default QuestionMarkdown
