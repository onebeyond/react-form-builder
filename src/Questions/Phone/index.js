/** @jsxRuntime classic */
/** @jsx jsx */
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'
import React from 'react'
import Phone from '../../Fields/Phone'
import { jsx } from 'theme-ui'

const QuestionPhone = ({ isMobile, isoCode, question, useForm, ...props }) => {
  const {
    formState: { errors },
    clearErrors,
    setError,
    control
  } = useForm

  const getDefaultCountry = () => {
    if (question.defaultCountry && question.defaultCountry !== '')
      return question.defaultCountry.toUpperCase()

    if (isoCode) return isoCode.toUpperCase()

    return ''
  }
  return (
    <React.Fragment>
      <div
        sx={{
          variant: question.id
            ? 'forms.phoneContainer.' + question.id
            : 'forms.phoneContainer'
        }}
      >
        {question.label && <Label>{question.label}</Label>}

        <Phone
          control={control}
          id={question.name}
          data-testid='question-phone'
          aria-describedby={'error_message_' + question.name}
          defaultCountry={getDefaultCountry()}
          setError={setError}
          clearErrors={clearErrors}
          placeholder={question.placeholder}
          registerConfig={question.registerConfig}
          name={question.name}
          international={question.international}
          {...props}
        />

        {errors[question.name] && errors[question.name].type === 'required' && (
          <ErrorMessage
            name={question.name}
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
        {errors[question.name] &&
          errors[question.name].type === 'isValidPhoneNumber' && (
            <ErrorMessage
              name={question.name}
              message={
                (question.errorMessages &&
                  question.errorMessages.isValidPhoneNumber) ||
                'Not a valid phone number'
              }
            />
          )}
        {errors[question.name] && errors[question.name].type === 'pattern' && (
          <ErrorMessage
            name={question.name}
            message={question.errorMessages && question.errorMessages.pattern}
          />
        )}
      </div>
    </React.Fragment>
  )
}

QuestionPhone.defaultProps = {
  isMobile: false,
  isoCode: 'GB'
}

export default QuestionPhone
