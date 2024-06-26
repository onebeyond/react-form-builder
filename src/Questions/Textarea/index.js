import { useFormContext } from 'react-hook-form'

import ErrorMessage from '../../Fields/Error'
import Textarea from '../../Fields/Textarea'
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

const QuestionTextarea = ({ question }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()



  const defaultRows = 5
  const reg = {
    ...question.registerConfig,
    pattern: new RegExp(question.registerConfig.pattern),
    // By default is char count
    minLength:
      question.registerConfig.countType !== 'word' &&
      question.registerConfig.minimumLen,
    maxLength:
      question.registerConfig.countType !== 'word' &&
      question.registerConfig.maximumLen,
    validate: {
      minWordCount: (v) => {
        if (
          question.registerConfig.countType === 'word' &&
          question.registerConfig.minimumLen
        ) {
          return (
            v.trim().split(/[\s,.\n]+/).length >=
            question.registerConfig.minimumLen
          )
        } else return true
      },
      maxWordCount: (v) => {
        if (
          question.registerConfig.countType === 'word' &&
          question.registerConfig.maximumLen
        ) {
          return (
            v.trim().split(/[\s,.\n]+/).length <=
            question.registerConfig.maximumLen
          )
        } else return true
      }
    }
  }

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
        maximumLen={question.registerConfig.maximumLen}
        countType={question.registerConfig.countType}
        data-haserrors={!!errors[question.name]}
        {...register(question.name, reg)}
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
      {errors[question.name] &&
        ['minWordCount', 'minLength'].includes(errors[question.name].type) && (
          <ErrorMessage
            name={question.name}
            message={
              question.errorMessages && question.errorMessages.minimumLen
            }
          />
        )}
      {errors[question.name] &&
        ['maxWordCount', 'maxLength'].includes(errors[question.name].type) && (
          <ErrorMessage
            name={question.name}
            message={
              question.errorMessages && question.errorMessages.maximumLen
            }
          />
        )}
    </div>
  )
}

export default QuestionTextarea
