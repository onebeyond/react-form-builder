/** @jsx jsx */
/** @jsxRuntime classic */

import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'
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

const QuestionSelect = ({ question, register, errors, watch }) => {
  return (
    <React.Fragment>
      <div
        sx={{
          ...(question.isFullWidth && styles.fullWidth)
        }}
      >
        {question.label && <Label>{question.label}</Label>}
        <Select
          key={question.name}
          name={question.name}
          {...question.registerConfig}
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
      {question.dependentQuestions &&
        question.dependentQuestions.map((dependentQuestion, i) => {
          return (
            <div
              sx={{
                ...(question.isFullWidth && styles.fullWidth)
              }}
              key={i}
            >
              {dependentQuestion.condition === watch(question.name) && (
                <Select
                  key={dependentQuestion.question.name}
                  name={dependentQuestion.question.name}
                  ref={register({
                    ...question.registerConfig,
                    validate: {
                      noEmpty: (value) => value !== '*'
                    }
                  })}
                >
                  {dependentQuestion.question.config &&
                    dependentQuestion.question.config.options.map((option) => {
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
              )}
              {errors[dependentQuestion.question.name] &&
                (errors[dependentQuestion.question.name].type === 'required' ||
                  errors[dependentQuestion.question.name].type ===
                    'noEmpty') && (
                  <ErrorMessage
                    message={
                      dependentQuestion.question.errorMessages &&
                      dependentQuestion.question.errorMessages.required
                    }
                  />
                )}
            </div>
          )
        })}
    </React.Fragment>
  )
}

export default QuestionSelect
