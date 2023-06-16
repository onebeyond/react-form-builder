/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'

import Checkbox from '../../Fields/Checkbox'
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'

import ReactMarkdown from '../../Fields/Markdown'

const QuestionCheckbox = ({ question, useForm, onLinkOpen }) => {
  const {
    formState: { errors },
    register
  } = useForm

  return (
    <div
      sx={{
        variant: question.id
          ? 'forms.checkboxContainer.' + question.id
          : 'forms.checkboxContainer'
      }}
    >
      <div key={question.name}>
        <Label
          htmlFor={question.name}
          sx={{
            variant: 'forms.checkbox.label'
          }}
        >
          <Checkbox
            id={question.name}
            aria-describedby={'error_message_' + question.name}
            name={question.name}
            defaultChecked={question.defaultChecked}
            {...register(question.name, {
              ...question.registerConfig
            })}
            data-testid='question-checkbox'
          />
          <ReactMarkdown
            sx={{
              alignSelf: 'center',
              p: { m: '0px' }
            }}
            source={question.label}
            onLinkOpen={onLinkOpen}
            modalLabel={question.modalLabel}
          />
        </Label>
        {errors[question.name] && errors[question.name].type === 'required' && (
          <ErrorMessage
            name={question.name}
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
      </div>
    </div>
  )
}

export default QuestionCheckbox
