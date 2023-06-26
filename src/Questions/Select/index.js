/** @jsxRuntime classic */
/** @jsx jsx */
import ErrorMessage from '../../Fields/Error'

import React from 'react'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'
import ReactMarkdown from '../../Fields/Markdown'
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
  useForm,
  component,
  onLinkOpen,
  ...props
}) => {
  const {
    formState: { errors },
    control,
    defaultValue,
    unregister
  } = useForm

  return (
    <React.Fragment>
      <div
        sx={{
          variant: question.id
            ? 'forms.selectContainer.' + question.id
            : 'forms.selectContainer'
        }}
      >
        {question.label && (
          <Label
            htmlFor={question.name}
            sx={{
              variant: 'forms.select.label'
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
        <Select
          control={control}
          defaultValue={defaultValue}
          unregister={unregister}
          id={question.name}
          aria-describedby={'error_message_' + question.name}
          options={getOptions(question)}
          isSearchable={false}
          placeholder={question.placeholder}
          key={question.name}
          name={question.name}
          registerConfig={question.registerConfig}
          label={question.label}
          arrows={question.config?.arrows}
          data-haserrors={!!errors[question.name]}
          {...props}
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
