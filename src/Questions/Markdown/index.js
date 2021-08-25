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
  onLinkOpen,
  theme
}) => {
  const CustomComponent = ({ component }) => component(question, useForm)

  return component ? (
    <CustomComponent component={component} />
  ) : (
    <div
      key={question.name}
      sx={
        question.id
          ? theme.markdownContainer[question.id]
          : theme.markdownContainer
      }
    >
      <ReactMarkdown
        sx={theme.markdown}
        source={question.label}
        onLinkOpen={onLinkOpen}
        modalLabel={question.modalLabel}
      />
    </div>
  )
}

export default QuestionMarkdown
