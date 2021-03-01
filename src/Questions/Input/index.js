import ErrorMessage from '../../Fields/Error'
import Input from '../../Fields/Input'
import Label from '../../Fields/Label'

/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const styles = {
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  }
}

const QuestionInput = ({ question, useForm, component }) => {
  const { register, errors } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)

  return component ? (
    <CustomComponent component={component} />
  ) : (
    <div
      sx={
        question.isFullWidth
          ? {
              ...(question.isFullWidth && styles.fullWidth),
              variant: 'forms.inputContainerFullWidth'
            }
          : {
              variant: 'forms.inputContainer'
            }
      }
    >
      {question.label && <Label>{question.label}</Label>}
      <Input
        key={question.name}
        name={question.name}
        type={question.type}
        placeholder={question.placeholder}
        defaultValue={question.defaultValue}
        ref={register({
          ...question.registerConfig,
          pattern: new RegExp(question.registerConfig.pattern)
        })}
      />
      {errors[question.name] && errors[question.name].type === 'required' && (
        <ErrorMessage
          message={question.errorMessages && question.errorMessages.required}
        />
      )}
      {errors[question.name] && errors[question.name].type === 'pattern' && (
        <ErrorMessage
          message={question.errorMessages && question.errorMessages.pattern}
        />
      )}
    </div>
  )
}

export default QuestionInput
