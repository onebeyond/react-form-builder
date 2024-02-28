import ReCAPTCHA from 'react-google-recaptcha'

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'

const QuestionRecaptcha = ({ recaptchaRef, formDataValues, onSubmitForm, question }) => {
  const onReCAPTCHAChange = async (captchaCode) => {
    if (!captchaCode) {
      return
    }

    recaptchaRef.current.reset()
    onSubmitForm(formDataValues)
  }

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      size="invisible"
      sitekey={question.recaptchaKey}
      onChange={onReCAPTCHAChange}
      data-testid="recaptcha-test"
    />
  )
}

export default QuestionRecaptcha
