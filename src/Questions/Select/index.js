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

const QuestionSelect = ({ question, useForm, component, theme, ...props }) => {
  const { register, errors, setValue, unregister, trigger } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)
  return component ? (
    <CustomComponent component={component} />
  ) : (
    <React.Fragment>
      <div
        sx={
          question.id
            ? theme?.selectContainer[question.id]
            : theme?.selectContainer
        }
      >
        {question.label && (
          <Label htmlFor={question.name}>{question.label}</Label>
        )}
        <Select
          onChange={() => {
            trigger(question.name)
          }}
          id={question.name}
          aria-describedby={'error_message_' + question.name}
          {...props}
          options={getOptions(question)}
          isSearchable={false}
          placeholder={question.placeholder}
          key={question.name}
          name={question.name}
          register={register}
          registerConfig={question.registerConfig}
          setValue={setValue}
          unregister={unregister}
          label={question.label}
          theme={theme?.select}
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
              theme={theme?.errorMessage}
              name={question.name}
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
