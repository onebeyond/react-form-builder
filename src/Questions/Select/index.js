/** @jsx jsx */
/** @jsxRuntime classic */
import ErrorMessage from '../../Fields/Error'

import React from 'react'
import Select from '../../Fields/Select'
import { jsx } from 'theme-ui'

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

const QuestionSelect = ({
  question,
  register,
  errors,
  watch,
  setValue,
  ...props
}) => {
  return (
    <React.Fragment>
      <div
        sx={{
          ...(question.isFullWidth && styles.fullWidth)
        }}
      >
        <Select
          key={question.name}
          name={question.name}
          ref={register({
            ...question.registerConfig,
            validate: {
              noEmpty: (value) => value !== '*'
            }
          })}
        >
          {question.config &&
            question.config.options.map((option) => {
              return (
                <option
                  key={option.value}
                  value={option.value}
                  sx={styles.selectOption}
                >
                  {option.label}
                </option>
              )
            })}
        </Select>
        {errors[question.name] &&
          (errors[question.name].type === 'required' ||
            errors[question.name].type === 'noEmpty') && (
            <ErrorMessage
              message={
                question.errorMessages && question.errorMessages.required
              }
            />
          )}
      </div>
    </React.Fragment>
  )
}

export default QuestionSelect
