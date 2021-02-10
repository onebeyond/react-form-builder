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
  question,
  errors,
  form,
  register,
  getValues
}) => {
  return (
    <div
      sx={{
        ...(question.isFullWidth && styles.fullWidth)
      }}
    >
      {question.label && <Label>{question.label}</Label>}
      <div sx={{ variant: 'forms.checkbox.' + form.layout }}>
        {question.config &&
          question.config.options.map((option) => {
            return (
              <div sx={styles.centerStyle} key={option.name}>
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
