import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'
import Radio from '../../Fields/Radio'
import ReactMarkdown from '../../Fields/Markdown'
/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const styles = {
  label: {
    alignItems: 'center'
  }
}
const QuestionRadio = ({ component, question, useForm, onLinkOpen, theme }) => {
  const { register, errors } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)

  const radioButtonGenerator = (question) => {
    const radio = question.options.map((option) => {
      return (
        <Label htmlFor={option.label} sx={styles.label} key={option.label}>
          <Radio
            id={option.label}
            aria-describedby={'error_message_' + question.name}
            name={question.name}
            value={option.value}
            ref={register({
              ...question.registerConfig
            })}
          />
          <p sx={theme?.radio.text}>{option.label}</p>
        </Label>
      )
    })

    return radio
  }

  return component ? (
    <CustomComponent component={component} />
  ) : (
    <div
      sx={
        question.id ? theme?.radioContainer[question.id] : theme?.radioContainer
      }
    >
      <fieldset sx={{ border: '0', margin: '0', padding: '0' }}>
        {question.accessibility ? (
          <legend htmlFor={question.name}>{question.label}</legend>
        ) : (
          <ReactMarkdown
            sx={theme?.radio.markdown}
            source={question.label}
            onLinkOpen={onLinkOpen}
          />
        )}

        <div>{radioButtonGenerator(question)}</div>

        {errors[question.name] && errors[question.name].type === 'required' && (
          <ErrorMessage
            theme={theme?.errorMessage}
            name={question.name}
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
      </fieldset>
    </div>
  )
}

export default QuestionRadio
