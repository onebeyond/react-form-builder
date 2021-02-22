/** @jsx jsx */
/** @jsxRuntime classic */
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'
import React from 'react'
import Date from '../../Fields/Date'
import { jsx } from 'theme-ui'

const styles = {
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  },
  halfWidth: {
    gridColumnStart: '0',
    gridColumnEnd: '0'
  }
}

const QuestionDate = ({
  question,
  register,
  errors,
  watch,
  setValue,
  dateFormat,
  isBirthDate,
  isMobile,
  ...props
}) => {
  return (
    <React.Fragment>
      <div
        sx={
          question.isFullWidth
            ? {
                ...(question.isFullWidth && styles.fullWidth),
                ...(!isMobile && styles.halfWidth),
                variant: 'forms.dateContainerFullWidth'
              }
            : {
                variant: 'forms.dateContainer'
              }
        }
      >
        {question.label && <Label>{question.label}</Label>}
        <Date
          sx={{ width: '100%', variant: 'forms.input' }}
          placeholder={question.placeholder}
          key={question.name}
          name={question.name}
          register={register}
          registerConfig={question.registerConfig}
          setValue={setValue}
          isMobile={isMobile}
          dateFormat={dateFormat}
          isBirthDate={isBirthDate}
          {...props}
        />
        {errors[question.name] && errors[question.name].type === 'required' && (
          <ErrorMessage
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
        {errors[question.name] && errors[question.name].type === 'u18' && (
          <ErrorMessage
            message={question.errorMessages && question.errorMessages.u18}
          />
        )}
      </div>
    </React.Fragment>
  )
}

export default QuestionDate
