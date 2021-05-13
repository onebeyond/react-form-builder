/** @jsx jsx */
/** @jsxRuntime classic */
import { Link, jsx } from 'theme-ui'

import Checkbox from '../../Fields/Checkbox'
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'

import ReactMarkdown from 'react-markdown'

const styles = {
  selectOption: {
    background: 'bg',
    color: 'black'
  },
  markDown: {
    fontFamily: 'regular',
    width: ['90%', '95%', '95%'],
    p: {
      margin: 0
    }
  }
}

const QuestionCheckbox = ({
  component,
  variant,
  form,
  question,
  useForm,
  onLinkOpen
}) => {
  const { errors, register } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)

  const MarkDownLink = ({ href, children }) => {
    const modalName = href.startsWith('#') && href.toString().substr(1)
    return (
      <Link
        href={`${href}`}
        target={modalName ? '_self' : '_blank'}
        {...(modalName ? { onClick: () => onLinkOpen(modalName) } : {})}
      >
        {children}
      </Link>
    )
  }

  return component ? (
    <CustomComponent component={component} />
  ) : (
    <div
      sx={{
        variant: question.id
          ? 'forms.checkboxContainer.' +
            (form && form.layout) +
            '.' +
            question.id
          : 'forms.checkboxContainer.' + (form && form.layout)
      }}
    >
      <div sx={styles.centerStyle} key={question.name}>
        <Label sx={styles.centerStyle}>
          <Checkbox
            sx={styles.checkboxMinWidth}
            name={question.name}
            defaultChecked={question.defaultChecked}
            ref={register({
              ...question.registerConfig
            })}
            data-testid='question-checkbox'
          />
          <ReactMarkdown
            sx={styles.markDown}
            source={question.label}
            renderers={{
              link: MarkDownLink
            }}
          />
        </Label>
        {errors[question.name] && errors[question.name].type === 'required' && (
          <ErrorMessage
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
      </div>
    </div>
  )
}

export default QuestionCheckbox
