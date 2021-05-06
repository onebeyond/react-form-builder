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
  dateFormat,
  isBirthDate,
  isMobile,
  ...props
}) => {
  const { errors, register, setValue } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)
  return component ? (
    <CustomComponent component={component} />
  ) : (
    <React.Fragment>
      <div
        sx={{
          variant: question.id
            ? 'forms.dateContainer.' + question.id
            : 'forms.dateContainer'
        }}
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
