import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'
import Radio from '../../Fields/Radio'
import ReactMarkdown from 'react-markdown'
/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const styles = {
  label: {
    alignItems: 'center'
  }
}
const QuestionRadio = ({ component, question, useForm }) => {
  const { register, errors } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)

  const radioButtonGenerator = (question) => {
    const radio = question.options.map((option) => {
      return (
        <Label htmlFor={option.name} sx={styles.label} key={option.label}>
          <Radio
            id={option.name}
            aria-describedby={'error_message_' + question.name}
            aria-required={question.registerConfig.required}
            name={question.name}
            value={option.value}
            ref={register({
              ...question.registerConfig
            })}
          />
          <p sx={{ variant: 'forms.radio.text' }}>{option.label}</p>
        </Label>
      )
    })

    return radio
  }

  return component ? (
    <CustomComponent component={component} />
  ) : (
    <div
      sx={{
        variant: question.id
          ? 'forms.radioContainer.' + question.id
          : 'forms.radioContainer'
      }}
    >
      <ReactMarkdown
        sx={{ variant: 'forms.radio.markdown' }}
        source={question.label}
      />
      {radioButtonGenerator(question)}

      {errors[question.name] && errors[question.name].type === 'required' && (
        <ErrorMessage
          name={question.name}
          message={question.errorMessages && question.errorMessages.required}
        />
      )}
    </div>
  )
}

export default QuestionRadio
