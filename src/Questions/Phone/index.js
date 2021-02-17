/** @jsx jsx */
/** @jsxRuntime classic */
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'
import React from 'react'
import Phone from '../../Fields/Phone'
import { jsx } from 'theme-ui'

const StyleTypeMap = {
  true: 'mobile',
  false: 'desktop'
}

const styles = {
  desktop: {
    input: {
      bg: 'background',
      padding: '15 16px',
      height: '44px',
      fontSize: '16px',
      mb: '8px',
      border: 'solid 1px #ccc',
      borderRadius: '22px'
    },
    label: {
      color: 'text',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: '16px',
      mt: '10px',
      justifyContent: 'center'
    }
  },
  mobile: {
    input: {
      bg: 'background',
      padding: '15 16px',
      height: '44px',
      fontSize: '16px',
      mb: '8px',
      border: 'solid 1px #ccc',
      borderRadius: '22px'
    },
    label: {
      color: 'text',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: '16px',
      mt: '10px',
      justifyContent: 'center'
    }
  },
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  }
}

const QuestionPhone = ({
  question,
  register,
  errors,
  watch,
  setValue,
  isMobile,
  setError,
  clearErrors,
  isoCode,
  ...props
}) => {
  return (
    <React.Fragment>
      <div
        sx={
          question.isFullWidth
            ? {
                ...(question.isFullWidth && styles.fullWidth),
                variant: 'forms.phoneContainerFullWith'
              }
            : {
                variant: 'forms.phoneContainer'
              }
        }
      >
        {question.label && (
          <Label sx={styles[StyleTypeMap[isMobile]].label}>
            {question.label}
          </Label>
        )}

        <Phone
          defaultCountry={isoCode.toUpperCase() || ''}
          style={styles[StyleTypeMap[isMobile]].input}
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
