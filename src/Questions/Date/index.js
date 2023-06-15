/** @jsxRuntime classic */
/** @jsx jsx */
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'
import React from 'react'
import DatePicker from '../../Fields/Date'
import { jsx } from 'theme-ui'

const QuestionDate = ({
  component,
  useForm,
  question,
  isMobile,
  language,
  ...props
}) => {
  const {
    formState: { errors },
    control,
    setValue
  } = useForm

  return (
    <React.Fragment>
      <div
        sx={{
          variant: question.id
            ? 'forms.dateContainer.' + question.id
            : 'forms.dateContainer'
        }}
      >
        {question.label && (
          <Label htmlFor={question.name}>{question.label}</Label>
        )}
        <DatePicker
          control={control}
          id={question.name}
          aria-describedby={'error_message_' + question.name}
          sx={{ width: '100%', variant: 'forms.input' }}
          placeholder={question.placeholder}
          key={question.name}
          language={language}
          name={question.name}
          registerConfig={question.registerConfig}
          setValue={setValue}
          isMobile={isMobile}
          dateFormat={question.dateFormat}
          minAge={question.minAge}
          {...props}
        />
        {errors[question.name] && errors[question.name].type === 'required' && (
          <ErrorMessage
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
        {errors[question.name] && errors[question.name].type === 'underAge' && (
          <ErrorMessage
            name={question.name}
            message={question.errorMessages && question.errorMessages.underAge}
          />
        )}
      </div>
    </React.Fragment>
  )
}

export default QuestionDate
