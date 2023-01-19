import ErrorMessage from '../../Fields/Error'
import Textarea from '../../Fields/Textarea'
import Label from '../../Fields/Label'
import Icon from '../../Common/Icon/Icon'

/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const styles = {
  boxIconStyle: {
    display: 'flex'
  }
}

const QuestionTextarea = ({ question, useForm }) => {
  const { register, errors } = useForm
  const defaultRows = 5

  return (
    <div
      sx={{
        variant: question.id
          ? 'forms.textareaContainer.' + question.id
          : 'forms.textareaContainer'
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
      <Textarea
        rows={question.rows || defaultRows}
        id={question.name}
        aria-describedby={'error_message_' + question.name}
        data-testid='question-input'
        key={question.name}
        name={question.name}
        placeholder={question.placeholder}
        defaultValue={question.defaultValue}
        ref={register({
          ...question.registerConfig,
          pattern: new RegExp(question.registerConfig.pattern),
          minLength: question.registerConfig.minimumLen,
          maxLength: question.registerConfig.maximumLen
        })}
      />
      {errors[question.name] &&
        errors[question.name].type &&
        question.errorMessages &&
        question.errorMessages[errors[question.name].type] && (
          <ErrorMessage
            name={question.name}
            sx={{ gridColumn: 1 }}
            message={
              question.errorMessages &&
              question.errorMessages[errors[question.name].type]
            }
          />
        )}
      {errors[question.name] && errors[question.name].type === 'minLength' && (
        <ErrorMessage
          name={question.name}
          message={question.errorMessages && question.errorMessages.minimumLen}
        />
      )}
      {errors[question.name] && errors[question.name].type === 'maxLength' && (
        <ErrorMessage
          name={question.name}
          message={question.errorMessages && question.errorMessages.maximumLen}
        />
      )}
    </div>
  )
}

export default QuestionTextarea
