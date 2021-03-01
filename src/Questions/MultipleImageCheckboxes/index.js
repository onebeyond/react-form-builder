/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

import Checkbox from '../../Fields/Checkbox'
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'

const styles = {
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  },
  selectOption: {
    background: 'bg',
    color: 'black'
  }
}

const QuestionMultipleImageCheckboxes = ({
  component,
  form,
  question,
  useForm
}) => {
  const { errors, getValues, register } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)

  return component ? (
    <CustomComponent component={component} />
  ) : (
    <div
      sx={{
        ...(question.isFullWidth && styles.fullWidth)
      }}
    >
      {question.label && <Label>{question.label}</Label>}
      <div sx={{ variant: 'forms.multipleImageCheckboxes.' + form.layout }}>
        {question.config &&
          question.config.options.map((option) => {
            return (
              <div
                sx={{
                  variant:
                    'forms.multipleImageCheckboxes.checksContainer.' +
                    form.layout
                }}
                key={option.name}
              >
                <Label sx={styles.centerStyle}>
                  <Checkbox
                    sx={styles.checkboxMinWidth}
                    name={question.name}
                    value={option.name}
                    ref={register({
                      ...question.registerConfig,
                      validate: {
                        minimumLen: () =>
                          getValues()[question.name] &&
                          getValues()[question.name].length >=
                            question.registerConfig.minimumLen
                      }
                    })}
                  />
                  <img src={option.src} />
                </Label>
              </div>
            )
          })}
        {errors[question.name] && errors[question.name].type === 'required' && (
          <ErrorMessage
            sx={{
              gridColumn: 1
            }}
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
        {errors[question.name] && errors[question.name].type === 'minimumLen' && (
          <ErrorMessage
            sx={{
              gridColumn: 1
            }}
            message={
              question.errorMessages && question.errorMessages.minimumLen
            }
          />
        )}
      </div>
    </div>
  )
}

export default QuestionMultipleImageCheckboxes
