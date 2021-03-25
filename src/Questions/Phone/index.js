/** @jsx jsx */
/** @jsxRuntime classic */
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'
import React from 'react'
import Phone from '../../Fields/Phone'
import { jsx } from 'theme-ui'

const styles = {
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  }
}

const QuestionPhone = ({
  component,
  isMobile,
  isoCode,
  question,
  useForm,
  ...props
}) => {
  const { clearErrors, errors, register, setError, setValue } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)

  return component ? (
    <CustomComponent component={component} />
  ) : (
    <React.Fragment>
      <div
        sx={
          question.isFullWidth
            ? {
                ...(question.isFullWidth && styles.fullWidth),
                variant: 'forms.phoneContainerFullWidth'
              }
            : {
                variant: 'forms.phoneContainer'
              }
        }
      >
        {question.label && <Label>{question.label}</Label>}

        <Phone
          defaultCountry={isoCode?.toUpperCase() || ''}
          register={register}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          placeholder={question.placeholder}
          {...props}
        />

        {errors[question.name] && errors[question.name].type === 'required' && (
          <ErrorMessage
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
        {errors[question.name] &&
          errors[question.name].type === 'isPossiblePhoneNumber' && (
            <ErrorMessage message='Not a valid phone number' />
          )}
        {errors[question.name] && errors[question.name].type === 'pattern' && (
          <ErrorMessage
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
