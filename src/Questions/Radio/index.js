import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'
import Radio from '../../Fields/Radio'
/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

import ReactMarkdown from '../../Fields/Markdown'

const QuestionRadio = ({ question, useForm, onLinkOpen }) => {
  const styles = {
    fieldset: {
      border: '0',
      m: '0',
      p: '0'
    },
    markDown: {
      alignSelf: 'center',
      p: { m: '0px' }
    }
  }

  const { register, errors } = useForm

  const radioButtonGenerator = (question) => {
    const radio = question.options.map((option) => {
      return (
        <Label
          htmlFor={option.label + question.name}
          sx={{ variant: 'forms.radio.label', alignItems: 'center' }}
          key={option.label + question.name}
        >
          <Radio
            id={option.label + question.name}
            aria-describedby={'error_message_' + question.name}
            name={question.name}
            value={option.value}
            ref={register({
              ...question.registerConfig
            })}
          />
          <p sx={{ m: '0' }}>{option.label}</p>
        </Label>
      )
    })

    return radio
  }

  return (
    <div
      sx={{
        variant: question.id
          ? 'forms.radioContainer.' + question.id
          : 'forms.radioContainer'
      }}
    >
      <fieldset sx={styles.fieldset}>
        {question.accessibility ? (
          <legend sx={{ variant: 'forms.label' }} htmlFor={question.name}>
            <ReactMarkdown
              sx={styles.markDown}
              source={question.label}
              onLinkOpen={onLinkOpen}
              modalLabel={question.modalLabel}
            />
          </legend>
        ) : (
          <Label htmlFor={question.label} key={question.label}>
            <ReactMarkdown
              sx={styles.markDown}
              source={question.label}
              onLinkOpen={onLinkOpen}
              modalLabel={question.modalLabel}
            />
          </Label>
        )}

        <div>{radioButtonGenerator(question)}</div>

        {errors[question.name] && errors[question.name].type === 'required' && (
          <ErrorMessage
            name={question.name}
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
      </fieldset>
    </div>
  )
}

export default QuestionRadio
