import ErrorMessage from '../../Fields/Error'
import Input from '../../Fields/Input'
import Label from '../../Fields/Label'
import Icon from '../../Common/Icon/Icon'

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'

const styles = {
  boxIconStyle: {
    display: 'flex'
  }
}

const QuestionInput = ({ question, useForm, component }) => {
  const {
    formState: { errors },
    register
  } = useForm

  return (
    <div
      sx={{
        variant: question.id
          ? 'forms.inputContainer.' + question.id
          : 'forms.inputContainer'
      }}
    >
      <div sx={styles.boxIconStyle}>
        {question.label && (
          <Label htmlFor={question.name}>{question.label}</Label>
        )}

        {question.icon && (
          <div>
            <Icon
              icon={question.icon}
              tooltip={question.tooltip}
              sx={{ variant: 'forms.icon' }}
            />
          </div>
        )}
      </div>
      <Input
        id={question.name}
        aria-describedby={'error_message_' + question.name}
        data-testid='question-input'
        key={question.name}
        name={question.name}
        type={question.type}
        placeholder={question.placeholder}
        defaultValue={question.defaultValue}
        data-haserrors={!!errors[question.name]}
        {...register(question.name, {
          ...question.registerConfig,
          pattern: new RegExp(question.registerConfig.pattern)
        })}
      />
      {errors[question.name] && errors[question.name].type === 'required' && (
        <ErrorMessage
          name={question.name}
          message={question.errorMessages && question.errorMessages.required}
        />
      )}
      {errors[question.name] && errors[question.name].type === 'pattern' && (
        <ErrorMessage
          name={question.name}
          message={question.errorMessages && question.errorMessages.pattern}
        />
      )}
    </div>
  )
}

export default QuestionInput
