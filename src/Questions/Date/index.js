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
  theme,
  ...props
}) => {
  const { errors, register, setValue } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)
  return component ? (
    <CustomComponent component={component} />
  ) : (
    <React.Fragment>
      <div
        sx={
          question.id
            ? theme && theme.dateContainer[question.id]
            : theme && theme.dateContainer
        }
      >
        {question.label && (
          <Label htmlFor={question.name}>{question.label}</Label>
        )}
        <Date
          id={question.name}
          aria-describedby={'error_message_' + question.name}
          sx={(theme && theme.input, { width: '100%' })}
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
            theme={theme && theme.errorMessage}
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
        {errors[question.name] && errors[question.name].type === 'underAge' && (
          <ErrorMessage
            theme={theme && theme.errorMessage}
            name={question.name}
            message={question.errorMessages && question.errorMessages.underAge}
          />
        )}
      </div>
    </React.Fragment>
  )
}

export default QuestionDate
