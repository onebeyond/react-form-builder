import ReCAPTCHA from 'react-google-recaptcha'

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'

const QuestionRecaptcha = ({ recaptchaRef, formDataValues, onSubmitForm }) => {
  const RECAPTCHA = {
    KEY: 'random',
    SECRET: 'random',
  }

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
      sitekey={RECAPTCHA.KEY}
      onChange={onReCAPTCHAChange}
      data-testid="recaptcha-test"
    />
  )
}

export default QuestionRecaptcha
