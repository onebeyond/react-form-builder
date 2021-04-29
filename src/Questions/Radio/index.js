import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'
import Radio from '../../Fields/Radio'
import ReactMarkdown from 'react-markdown'
/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const QuestionRadio = ({ component, question, useForm }) => {
  const { register, errors } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)

  const radioButtonGenerator = (question) => {
    const radio = question.options.map((option) => {
      return (
        <Label key={option.label}>
          <Radio
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
          message={question.errorMessages && question.errorMessages.required}
        />
      )}
    </div>
  )
}

export default QuestionRadio
