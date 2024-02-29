import { forwardRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'

const QuestionRecaptcha = forwardRef(({ formDataValues, onSubmitForm, question }, ref) => {
  const onReCAPTCHAChange = async (captchaCode) => {
    if (!captchaCode) {
      return
    }

    ref?.current?.reset()
    onSubmitForm(formDataValues)
  }

  return (
    <ReCAPTCHA
      ref={ref}
      size="invisible"
      sitekey={question.recaptchaKey}
      onChange={onReCAPTCHAChange}
      data-testid="recaptcha-test"
    />
  )
})

export default QuestionRecaptcha
