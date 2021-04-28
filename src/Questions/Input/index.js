import ErrorMessage from '../../Fields/Error'
import Input from '../../Fields/Input'
import Label from '../../Fields/Label'
import Logo from '../../Common/Icon/Logo'
import FBtooltip from '../../Common/Icon/FBtooltip'

/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const styles = {
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  },
  boxIconStyle: {
    display: 'flex'
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
      <div sx={styles.boxIconStyle}>
        {question.label && <Label>{question.label}</Label>}

        {question.icon && (
          <div>
            <Logo icon={question.icon} sx={{ variant: 'forms.icon' }} />
            {question.tooltip.text && <FBtooltip tooltip={question.tooltip} />}
          </div>
        )}
      </div>
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
