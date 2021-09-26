/** @jsx jsx */
/** @jsxRuntime classic */
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'
import React from 'react'
import Date from '../../Fields/Date'
import { jsx } from 'theme-ui'

const QuestionDate = ({
  component,
  useForm,
  question,
  isMobile,
  language,
  ...props
}) => {
  const { errors, register, setValue } = useForm

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
        <Date
          id={question.name}
          aria-describedby={'error_message_' + question.name}
          sx={{ width: '100%', variant: 'forms.input' }}
          placeholder={question.placeholder}
          key={question.name}
          language={language}
          name={question.name}
          register={register}
          registerConfig={question.registerConfig}
          setValue={setValue}
          isMobile={isMobile}
          dateFormat={question.dateFormat}
          minAge={question.minAge}
          openToDate={question.openToDate}
          selected={question.openToDate}
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
