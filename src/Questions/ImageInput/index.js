import ErrorMessage from '../../Fields/Error'
import FieldDescription from '../../Fields/FieldDescription'
import Input from '../../Fields/Input'
import Label from '../../Fields/Label'
import ReactMarkdown from '../../Fields/Markdown'
import Icon from '../../Common/Icon/Icon'

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'

const styles = {
  boxIconStyle: {
    display: 'flex'
  }
}

const QuestionImageInput = ({ question, useForm, onLinkOpen }) => {
  const {
    formState: { errors },
    register
  } = useForm

  return (
    <div
      sx={{
        variant: question.id
          ? 'forms.inputContainer.' + question.id
          : 'forms.inputContainer'
      }}
    >
      <div sx={styles.boxIconStyle}>
        {question.label && (
          <Label
            htmlFor={question.name}
            sx={{
              variant: 'forms.input.label'
            }}
          >
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
        )}

        {question.icon && (
          <div>
            <Icon
              icon={question.icon}
              tooltip={question.tooltip}
              sx={{ variant: 'forms.icon' }}
            />
          </div>
        )}
      </div>
      <Input
        id={question.name}
        type='file'
        accept='image/png, image/jpeg'
        aria-describedby={'error_message_' + question.name}
        data-testid='question-image-input'
        key={question.name}
        name={question.name}
        placeholder={question.placeholder}
        defaultValue={question.defaultValue}
        data-haserrors={!!errors[question.name]}
        {...register(question.name, {
          ...question.registerConfig
        })}
      />
      {errors[question.name] && errors[question.name].type && (
        <ErrorMessage
          name={question.name}
          message={
            question.errorMessages &&
            question.errorMessages[errors[question.name].type]
          }
        />
      )}
      {question.descriptions && question.descriptions.length > 0 && (
        <FieldDescription
          name={question.name}
          descriptions={question.descriptions}
        />
      )}
    </div>
  )
}

export default QuestionImageInput
