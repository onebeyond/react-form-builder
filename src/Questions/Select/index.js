/** @jsx jsx */
/** @jsxRuntime classic */
import ErrorMessage from '../../Fields/Error'

import React from 'react'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'
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

const getOptions = (question) => {
  return (
    question.config &&
    question.config.options.map((option) => {
      return {
        value: option.value,
        label: option.label
      }
    })
  )
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
        sx={
          question.isFullWidth
            ? {
                ...(question.isFullWidth && styles.fullWidth),
                variant: 'forms.selectContainerFullWidth'
              }
            : {
                variant: 'forms.selectContainer'
              }
        }
      >
        {question.label && <Label>{question.label}</Label>}
        <Select
          {...props}
          defaultValue={getOptions(question)[0]}
          options={getOptions(question)}
          isSearchable={false}
          key={question.name}
          name={question.name}
          register={register}
          registerConfig={question.registerConfig}
          setValue={setValue}
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
